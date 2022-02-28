/**
 * Selected package name
 * This is configured via .env
 */
const packageName: string = process.env.APP_PACKAGE || '';

/**
 * @param line of the shrinking usage
 * @returns true if line is a valid class to be processed by the parser
 */
function isValidClass(line: string): boolean {
  const packageFilter = packageName ? line.startsWith(packageName) : true;
  return (
    packageFilter &&
    !line.includes('$') &&
    !line.includes('_') &&
    !line.includes('.R') &&
    !line.includes('BuildConfig') &&
    !line.includes('Test') &&
    !line.includes('Kt') && // KT file without class
    !line.endsWith('Module') && // Dagger module
    !line.endsWith('Component')
  ); // Dagger component
}

/**
 * Inidcate if a line is part of ViewBinding or DataBinding library
 *
 * @param line of the shrinking usage
 * @returns true if the line indicate a binding class
 */
function isBindingClass(line: string): boolean {
  return line.endsWith('Binding') && line.includes('databinding');
}

/**
 * Parent class is usually indicate that the class is not removed
 * but rather the fields or methods inside that class
 *
 * @param line of the shrinking usage
 * @returns true if the line indicate a parent class
 */
function isParentClass(line: string): boolean {
  return line.endsWith(':');
}

/**
 * Identify internal symbol, it can be a field or methods
 *
 * @param line of the shrinking usage
 * @returns true if the line indicate internal symbol
 */
function isInternalSymbol(line: string): boolean {
  return line.startsWith('    ');
}

/**
 * Check wheter the line is a symbol from Kotlin data class
 *
 * @param line of the shrinking usage
 * @returns true if the line inidcate data class symbol
 */
function isDataClassSymbol(line: string): boolean {
  return (
    line.includes('copy(') ||
    line.includes('copy$default(') ||
    (line.includes('component') && line.endsWith('()'))
  );
}

/**
 * Check wheter the line is a class generate from Dagger library
 *
 * @param line of the shrinking usage
 * @returns true if the line inidcate a dagger class
 */
function isPossiblyDaggerClass(line: string): boolean {
  return (
    line.endsWith('Scope') ||
    (line.includes('dagger') && line.endsWith('Component')) ||
    line.endsWith('Qualifier')
  );
}

interface ProguardResultVisitor {
  visitClass(line: string, isClassUnused: boolean): void;
  visitInternalSymbol(line: string, parentClass: string): void;
}

interface ResultNode {
  [parent: string]: {
    tags: string[];
    children: string[];
  };
}

class ResultBuilder {
  result: ResultNode = {};

  addParent(parentClass: string) {
    const child = this.getEmptyChild();
    this.result[parentClass] = child;
  }

  addChild(parentClass: string, child: string) {
    const children = this.result[parentClass].children;
    children.push(child);
  }

  addTag(parentClass: string, tag: string) {
    const children = this.result[parentClass].tags;

    if (!children.includes(tag)) {
      children.push(tag);
    }
  }

  build(): string {
    return JSON.stringify(this.result, null, 2);
  }

  private getEmptyChild() {
    return {
      tags: [],
      children: [],
    };
  }
}

class ProguardResultVisitorImpl implements ProguardResultVisitor {
  resultBuilder: ResultBuilder;

  constructor(resultBuilder: ResultBuilder) {
    this.resultBuilder = resultBuilder;
  }

  visitInternalSymbol(line: string, parentClass: string) {
    if (isDataClassSymbol(line)) {
      this.resultBuilder.addTag(parentClass, 'data');
    } else {
      this.resultBuilder.addChild(parentClass, line);
    }
  }

  visitClass(line: string, isClassUnused: boolean) {
    const resultBuilder = this.resultBuilder;

    resultBuilder.addParent(line);

    if (isClassUnused) {
      resultBuilder.addTag(line, 'unused');
    }

    if (isPossiblyDaggerClass(line)) {
      resultBuilder.addTag(line, 'dagger');
    }

    if (isBindingClass(line)) {
      resultBuilder.addTag(line, 'binding');
    }
  }
}

/* Main */
/* ------------------------------------------ */

const fs = require('fs');
const readline = require('readline');

const inputPath = 'usage.txt';
const outputPath = 'src/data.json';

if (!fs.existsSync(inputPath)) {
  throw new Error(`Input not exists at: ${inputPath}`);
}

const lineReader = readline.createInterface({
  input: fs.createReadStream(inputPath),
});

const builder = new ResultBuilder();
const visitor = new ProguardResultVisitorImpl(builder);

let parentClass = '';

lineReader.on('line', (line: string) => {
  const valid = isValidClass(line);

  if (valid) {
    console.log(`Visit class ${line}`);

    if (isParentClass(line)) {
      const normalizedValue = line.replace(':', '');
      visitor.visitClass(normalizedValue, false);
      parentClass = normalizedValue;
    } else {
      visitor.visitClass(line, true);
    }
  } else if (isInternalSymbol(line) && parentClass) {
    console.log(`visit internal $line : ${parentClass}`);
    visitor.visitInternalSymbol(line.trim(), parentClass);
  } else {
    // Invalid class
    parentClass = '';
  }
});

lineReader.on('error', (err: Error) => {
  throw err;
});

lineReader.on('close', () => {
  const content = builder.build();
  fs.writeFile(outputPath, content, (err: Error) => {
    if (err) {
      console.log('Error is happening!');
      console.error(err);
    } else {
      console.log('Report parsing success!');
    }
  });
});

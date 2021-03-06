#!/usr/bin/env node

//@ts-ignore
const fs = require('fs');
const { execSync } = require('child_process');

if (process.argv[2] === '--help') {
  console.log(`

    == Guard Report ==

    Usage:
    - npx create-guard-report <usage-file>
    - npx create-guard-report <usage-file> <branch>

  `);
  process.exit(0);
}

const configPath = process.argv[2] || 'gr-config.json';
if (!fs.existsSync(configPath)) {
  throw new Error(
    'You must have gr-config.json in the root of directory or provide it with create-guard-report <usage-file>'
  );
}

const branch = process.argv[3] || 'main';

// Process config
interface Config {
  path: string;
  package: string;
  includeLib: boolean;
}
const data = fs.readFileSync(configPath, { encoding: 'utf8', flag: 'r' });
const config = JSON.parse(data);

//@ts-ignore
const inputPath = config.path;
const appPackage = config.package;
const includeLib = config.includeLib || false;

const zipFile = `https://github.com/esafirm/guard-report/archive/refs/heads/${branch}.zip`;
const targetFile = '/tmp/template.zip';
const targetDir = '/tmp/cgr-template/';
const realTargetDir = `${targetDir}guard-report-${branch}`;

const options = { stdio: 'ignore' };
const openCommand = `cd ${realTargetDir}`;

// Printing info
console.log(`Using ${inputPath} as the input`);
console.log(`Using ${appPackage} as app package`);
console.log(`Include libraries set to ${includeLib}`);

// Prepare env
execSync(`rm -rf ${targetFile} ${targetDir}`, options);

// Download the zip
console.log(`Downloading the template for branch ${branch}…`);
execSync(`curl -L ${zipFile} --output ${targetFile}`, options);

// Extract the zip and delete
console.log('Extract the zip…');
execSync(
  `mkdir -p ${targetDir} && unzip ${targetFile} -d ${targetDir}`,
  options
);
execSync(`rm -rf ${targetFile}`, options);

// Copy the input
execSync(`cp -a ${inputPath} ${realTargetDir}`);

// Setup the package name
console.log('Preparing report…');
execSync(`${openCommand} && echo REACT_APP_PACKAGE=${appPackage} > .env`);

// Installing dependencies
console.log('Installing dependencies…');
execSync(`${openCommand} && npm install --install`);

// Creating the report
console.log('Creating the report…');
const outputFile = `${process.cwd()}/Guard\\ Report.html`;
const env = `APP_PACKAGE=${appPackage} GR_INCLUDE_LIB=${includeLib}`;

execSync(`${openCommand} && ${env} npm run create-report`, options);
execSync(`mv ${realTargetDir}/build/index.html ${outputFile}`);

// Cleanup
console.log('Clean up…');
execSync(`rm -rf ${targetDir}`);

console.log(`Process done! Output file is in ${outputFile}`);

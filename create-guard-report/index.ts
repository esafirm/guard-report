#!/usr/bin/env node

//@ts-ignore
const fs = require('fs');
const { execSync } = require('child_process');

//@ts-ignore
const inputPath = 'usage.txt';
if (!fs.existsSync(inputPath)) {
  throw new Error('You must have usage.txt in the root of directory');
}

const branch = 'ts_parser';
const zipFile = `https://github.com/esafirm/guard-report/archive/refs/heads/${branch}.zip`;
const targetFile = '/tmp/template.zip';
const targetDir = '/tmp/cgr-template/';
const realTargetDir = `${targetDir}guard-report-${branch}`;

const options = { stdio: 'ignore' };

// Prepare env
execSync(`rm -rf ${targetFile} ${targetDir}`, options);

// Download the zip
console.log('Downloading the template…');
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

// Creating the report
console.log('Creating the report…');
execSync(
  `cd ${realTargetDir} && npm run create-report && mv ${targetDir}/build/index.html .`
);

// Cleanup
console.log('Clean up…');
execSync(`rm -rf ${targetDir}`);

console.log('Process done!');

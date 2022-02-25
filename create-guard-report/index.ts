#!/usr/bin/env node

const { execSync } = require('child_process');

const branch = "ts_parser"
const zipFile =
  `https://github.com/esafirm/guard-report/archive/refs/heads/${branch}.zip`;
const targetFile = '/tmp/template.zip';
const targetDir = '/tmp/cgr-template/';

const options = { stdio: 'pipe' };

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

// Creating the report
console.log('Creating the report…');
execSync(
  `cd ${targetDir}guard-report-${branch} && npm run create-report && mv ${targetDir}/build/index.html .`
);

console.log('Process done!');

#!/usr/bin/env node

const path = require(`path`);
const program = require(`commander`);
const packageJson = require(`${__dirname}/../package.json`);
const watch = require(`${__dirname}/watch.js`);

// set version
program.version(packageJson.version);

// options
program.option(
  `-d, --directory [type]`,
  `Input directory of mapfiles with EJS (*.emap) (default: current directory)`
);
program.option(
  `-i, --inputEncoding [type]`,
  `Encoding of input mapfiles with EJS (default: utf8)`
);
program.option(
  `-o, --outputEncoding [type]`,
  `Encoding of output mapfiles without EJS (default: utf8)`
);
program.option(
  `-r, --ignoreInitial`,
  `Ignore rendering of mapfiles with EJS on initial (default: false)`
);
program.option(
  `-e, --eFiles`,
  `Render all e files like *.exml, *.ecss (default: false)`
);

// examples
program.on(`--help`, function() {
  console.log(`  Examples:`);
  console.log(``);
  console.log(`    Start watching and rendering with default options:`);
  console.log(`      $ emap `);
  console.log(``);
  console.log(`    Start watching and rendering with custom options:`);
  console.log(`      $ emap -d ./examples -i iso-8859-1 -o iso-8859-1 -r`);
  console.log(``);
});

// header
let msg = `###################################################
## ${packageJson.name} v${packageJson.version} #############################
###################################################
`;

// parse arguments
program.parse(process.argv);

// set directory
if (!program.directory) {
  program.directory = path.resolve(`.`);
} else {
  program.directory = path.resolve(program.directory);
  console.log(path.resolve(program.directory));
}
msg += `  Watching at ${program.directory}\n`;

// set input encoding
if (!program.inputEncoding) {
  program.inputEncoding = `utf8`;
}
msg += `  Input encoding: ${program.inputEncoding}\n`;

// set output encoding
if (!program.outputEncoding) {
  program.outputEncoding = `utf8`;
}
msg += `  Output encoding: ${program.outputEncoding}\n`;

// set no rendering on start
if (!program.ignoreInitial) {
  program.ignoreInitial = false;
}
msg += `  Ignore rendering on initial: ${program.ignoreInitial}\n`;

if (!program.eFiles) {
  program.eFiles = false;
}
msg += `  Render all e files: ${program.eFiles}\n`;

// footer
msg += `###################################################
## Stop watching with Ctrl+C ######################
###################################################
`;

// log message
console.log(msg);

// watch and render
watch(program.directory, {
  inputEncoding: program.inputEncoding,
  outputEncoding: program.outputEncoding,
  ignoreInitial: program.ignoreInitial,
  eFiles: program.eFiles
});

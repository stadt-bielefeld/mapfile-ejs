#!/usr/bin/env node

import path from 'node:path';
import watch from './watch.js';
import { program } from 'commander';
import { fileURLToPath } from 'url';
import fs from 'node:fs/promises';

(async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const packageJson = JSON.parse(await fs.readFile(path.resolve(__dirname, `..`, `package.json`), { encoding: `utf8` }));

  // set version
  program.version(packageJson.version);


  // options
  program.option(
    `-d, --directory <string>`,
    `Input directory of mapfiles with EJS (*.emap) (default: current directory)`
  );
  program.option(
    `-i, --inputEncoding <string>`,
    `Encoding of input mapfiles with EJS (default: utf8)`
  );
  program.option(
    `-o, --outputEncoding <string>`,
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
  program.on(`--help`, function () {
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
  await program.parseAsync(process.argv);
  const opts = program.opts();

  // set directory
  if (!opts.directory) {
    opts.directory = path.resolve(`.`);
  } else {
    opts.directory = path.resolve(opts.directory);
    console.log(path.resolve(opts.directory));
  }
  msg += `  Watching at ${opts.directory}\n`;

  // set input encoding
  if (!opts.inputEncoding) {
    opts.inputEncoding = `utf8`;
  }
  msg += `  Input encoding: ${opts.inputEncoding}\n`;

  // set output encoding
  if (!opts.outputEncoding) {
    opts.outputEncoding = `utf8`;
  }
  msg += `  Output encoding: ${opts.outputEncoding}\n`;

  // set no rendering on start
  if (!opts.ignoreInitial) {
    opts.ignoreInitial = false;
  }
  msg += `  Ignore rendering on initial: ${opts.ignoreInitial}\n`;

  if (!opts.eFiles) {
    opts.eFiles = false;
  }
  msg += `  Render all e files: ${opts.eFiles}\n`;

  // footer
  msg += `###################################################
## Stop watching with Ctrl+C ######################
###################################################
`;

  // log message
  console.log(msg);

  // watch and render
  watch(opts.directory, {
    inputEncoding: opts.inputEncoding,
    outputEncoding: opts.outputEncoding,
    ignoreInitial: opts.ignoreInitial,
    eFiles: opts.eFiles
  });

})();

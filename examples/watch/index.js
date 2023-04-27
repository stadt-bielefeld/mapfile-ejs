// node examples/watch/index.js

import { watch } from '../../index.js';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// watch a directory with default options
watch(`${__dirname}/dir1`);

// watch a directory with custom options
watch(`${__dirname}/dir2`, {
  inputEncoding: `utf8`,
  outputEncoding: `utf8`,
  eFiles: true,
  ignoreInitial: true
});

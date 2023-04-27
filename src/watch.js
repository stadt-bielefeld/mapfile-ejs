import path from 'node:path';
import chokidar from 'chokidar';
import isTemplate from './isTemplate.js';
import render from './render.js';

const defaultOptions = {
  inputEncoding: `utf8`,
  outputEncoding: `utf8`,
  ignoreInitial: false,
  eFiles: false
};

/**
 * Watches a directory and renders ejs templates on change.
 * @param {String} dir Path of the directory
 * @param {Object} options Options of this function
 * @param {String} [options.inputEncoding=`utf8`] Encoding of the input file (see {@link https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings| Supported encodings}).
 * @param {String} [options.outputEncoding=`utf8`] Encoding of the output file (see {@link https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings| Supported encodings}).
 * @param {Boolean} [options.ignoreInitial=false] `true`: Ignore rendering of files on initial, `false`: Render all file on inital
 * @param {Boolean} [options.eFiles=false] `true`: Render all e files like *.exml, *.ecss, `false`: Render only *.emap
 * @returns {Object} Watcher object, see {@link https://github.com/paulmillr/chokidar}
 * @example
 * import { watch } from 'mapfile-ejs';
 * // watch a directory with default options
 * watch(`dir1`);
 * 
 * // watch a directory with custom options
 * watch(`dir2`, {
 *   inputEncoding: `utf8`,
 *   outputEncoding: `utf8`,
 *   eFiles: true,
 *   ignoreInitial: true
 * });
 */
export default function watch(dir, options) {
  // resolve options
  options = { ...defaultOptions, ...options };

  // resolve dir
  dir = path.resolve(dir);

  // watch the directory
  const watcher = chokidar.watch(dir, {
    ignoreInitial: options.ignoreInitial,
    persistent: true,
    usePolling: true
  });

  // handle added files
  watcher.on(`add`, async (file) => {
    const outputFile = isTemplate(file, options.eFiles);
    if (outputFile) {
      console.log(`add ` + file);
      await render(file, outputFile, {
        inputEncoding: options.inputEncoding,
        outputEncoding: options.outputEncoding
      });
    } else {
      watcher.unwatch(file);
    }
  });

  // handle changed files
  watcher.on(`change`, async (file) => {
    const outputFile = isTemplate(file, options.eFiles);
    if (outputFile) {
      console.log(`change ` + file);
      await render(file, outputFile, {
        inputEncoding: options.inputEncoding,
        outputEncoding: options.outputEncoding
      });
    } else {
      watcher.unwatch(file);
    }
  });

  // handle errors
  watcher.on(`error`, error => {
    console.error(`ERROR: ` + error);
  });

  return watcher;
}

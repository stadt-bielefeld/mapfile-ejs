import path from 'node:path';
import fs from 'node:fs';
import ejs from 'ejs';
import iconv from 'iconv-lite';

const defaultOptions = {
  inputEncoding: `utf8`,
  outputEncoding: `utf8`
};

/**
 * Renders a ejs template file.
 * @param {String} inputFile Path of ejs template file
 * @param {String} outputFile Path of output file
 * @param {Object} [options]  Options of this function
 * @param {String} [options.inputEncoding=`utf8`] Encoding of the input file (see {@link https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings| Supported encodings}).
 * @param {String} [options.outputEncoding=`utf8`] Encoding of the output file (see {@link https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings| Supported encodings}).
 * @returns {Boolean} `true`: Rendering was successful, `false`: Rendering wasn’t successful
 * @example
 * import { render } from 'mapfile-ejs';
 *
 * (async () => {
 *   // render file with default options
 *   await render(
 *     `template__utf8.emap`,
 *     `template__utf8.map`
 *   );
 *   
 *   // render file with defined output encoding
 *   await render(
 *     `template__utf8.emap`,
 *     `template__iso_8859_1__01.map`,
 *     { outputEncoding: `ISO-8859-1` }
 *   );
 *   
 *   // render file with defined input and output encoding
 *   await render(
 *     `template__iso_8859_1.emap`,
 *     `template__iso_8859_1__02.map`,
 *     { inputEncoding: `ISO-8859-1`, outputEncoding: `ISO-8859-1` }
 *   );
 * })();
 */
export default async function render(inputFile, outputFile, options) {
  try {
    // resolve options
    options = { ...defaultOptions, ...options };

    // resolve path of input and output file
    inputFile = path.resolve(inputFile);
    outputFile = path.resolve(outputFile);

    // read file as buffer
    const inputDataBuffer = fs.readFileSync(inputFile);

    // decode the buffer to a string
    const inputData = iconv.decode(inputDataBuffer, options.inputEncoding);

    // render ejs
    const parsedInputFile = path.parse(inputFile);
    const outputData = await ejs.render(
      inputData,
      { 
        async: true,
        filename: inputFile,
        __filename: inputFile,
        __dirname: parsedInputFile.dir
      }
    );

    // create a buffer
    const outputDataBuffer = iconv.encode(outputData, options.outputEncoding);

    // write the output file
    fs.writeFileSync(outputFile, outputDataBuffer);

    // show a message of the rendered file
    console.log(`Rendered ${outputFile}`);

    return true;
  } catch (e) {
    // show any error
    console.error(e.message);

    return false;
  }
}

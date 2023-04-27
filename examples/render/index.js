// node examples/render/index.js

import { render } from '../../index.js';

import path from 'node:path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  // render file with default options
  const r1 = await render(
    `${__dirname}/template__utf8.emap`,
    `${__dirname}/template__utf8.map`
  );
  console.log(r1); // true

  // render file with defined output encoding
  const r2 = await render(
    `${__dirname}/template__utf8.emap`,
    `${__dirname}/template__iso_8859_1__01.map`,
    { outputEncoding: `ISO-8859-1` }
  );
  console.log(r2); // true

  // render file with defined input and output encoding
  const r3 = await render(
    `${__dirname}/template__iso_8859_1.emap`,
    `${__dirname}/template__iso_8859_1__02.map`,
    { inputEncoding: `ISO-8859-1`, outputEncoding: `ISO-8859-1` }
  );
  console.log(r3); // true

  // try to render a file with an error
  const r4 = await render(
    `${__dirname}/template__utf8_error.emap`,
    `${__dirname}/template__utf8_error.map`
  );
  console.log(r4); // false

})();



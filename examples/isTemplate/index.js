// node examples/isTemplate/index.js

import { isTemplate } from '../../index.js';

console.log(isTemplate(`filename.emap`, false)); // filename.map
console.log(isTemplate(`filename.ecss`, false)); // null
console.log(isTemplate(`filename.ecss`, true));  // filename.css
console.log(isTemplate(`filename.map`, false));  // null
console.log(isTemplate(`filename.css`, false));  // null
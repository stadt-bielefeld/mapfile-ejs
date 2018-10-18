`use strict`;

const render = require(`${__dirname}/src/render.js`);
const watch = require(`${__dirname}/src/watch.js`);
const isTemplate = require(`${__dirname}/src/isTemplate.js`);

module.exports = {
  isTemplate,
  render,
  watch
};
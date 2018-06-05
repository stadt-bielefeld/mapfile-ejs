"use strict";

//-- Modules -------------------------------------------------------------------
let fs = require('fs'); //File reader and writer
let iconv = require('iconv-lite'); //Encoding converter
let chokidar = require('chokidar'); //Watcher
let ejs = require('ejs'); //Renderer for EJS content
//-- Modules -------------------------------------------------------------------

/**
 * The MapfileRenderer watches a directory and renders all mapfiles with EJS (*.emap) to normal mapfiles (*.map).
 */
class MapfileRenderer {

  /**
   * Creates a MapfileRenderer.
   */
  constructor() {

    //Default options
    this._options = {
      inputEncoding: 'utf8',
      outputEncoding: 'utf8',
      ignoreInitial: false,
      eFiles: false
    };

  }

  /**
   * It returns the current options.
   */
  getOptions() {
    return this._options;
  }

  /**
   * It renders a mapfile with EJS (*.emap) to a normal mapfile (*.map) in the same directory.
   * @param {string} file Path of a mapfile with EJS (*.emap)
   */
  _renderFile(file) {
    try {

      //Read file as buffer
      let inputDataBuffer = fs.readFileSync(file);

      //Decode the buffer to a string
      let inputData = iconv.decode(inputDataBuffer, this._options.inputEncoding);

      //Render the EJS
      let outputData = ejs.render(inputData,{ require: require, filename: file},{filename: file});

      //Create a buffer
      let outputDataBuffer = iconv.encode(outputData, this._options.outputEncoding);

      //Determine file name of the normal mapfile
      let splittedFile = file.split('.');
      let fileExt = splittedFile[splittedFile.length - 1];
      let newFile = file.replace('.' + fileExt, '.' + fileExt.substring(1, fileExt.length));

      //Write the normal mapfile
      fs.writeFileSync(newFile, outputDataBuffer);

      //Show a message of the rendered file
      console.log(newFile + ' was rendered.');

    } catch (e) {

      //Show any error
      console.error(e.message);
    }
  }

  /**
   * It removes the normal mapfile (*.map) of a mapfile with EJS (*.emap).
   * @param {string} file Path of a mapfile with EJS (*.emap)
   */
  _removeFile(file) {
    //Determine file name of the normal mapfile
    let newFile = file.replace('.emap', '.map');

    try {

      //Remove the normal mapfile
      fs.unlinkSync(newFile);

      //Show a message of the deleted file
      console.log(newFile + ' was deleted.');
    } catch (e) {

      //Show any error
      console.error(e.message);
    }
  }

  /**
   * It starts file watching and rendering of mapfiles with EJS (*.emap).
   *  @param {string} dir Directory of mapfiles with EJS (*.emap)
   *  @param {object} options Options
   *  @param {string} options.inputEncoding Encoding of input mapfiles with EJS (default: utf8)
   *  @param {string} options.outputEncoding Encoding of output mapfiles without EJS (default: utf8)
   *  @param {boolean} options.ignoreInitial Ignore rendering of mapfiles with EJS on initial (default: false)
   *  @param {boolean} options.eFiles Render all e files like *.exml, *.ecss (default: false)
   */
  watch(dir, options) {

    //Set options
    if (options) {
      this._options = Object.assign(this._options, options);
    }

    //Set file extension for watching
    if (dir.endsWith('/') || dir.endsWith('\\')) {
      if(this._options.eFiles){
        dir += '**/*.e*';
      }else{
        dir += '**/*.emap';
      }
    } else {
      if(this._options.eFiles){
        dir += '/**/*.e*';
      }else{
        dir += '/**/*.emap';
      }
    }

    //Close watcher, if it's running
    if (this._watcher) {
      this._watcher.close();
    }

    //Watch the directory
    this._watcher = chokidar.watch(dir, {
      ignored: /[\/\\]\./,
      ignoreInitial: this._options.ignoreInitial,
      persistent: true,
      usePolling: true
    });

    //Handle added files
    this._watcher.on('add', (file) => {
      console.log('add ' + file);
      this._renderFile(file);
    });

    //Handle changed files
    this._watcher.on('change', (file) => {
      console.log('change ' + file);
      this._renderFile(file);
    });

    //Handle unlinked files
    this._watcher.on('unlink', (file) => {
      //this._removeFile(file);
    });

    //Handle errors
    this._watcher.on('error', (error) => {
      console.error('ERROR: ' + error);
    });
  }

  /**
   * It closes the file watcher.
   */
  close() {
    if (this._watcher) {
      this._watcher.close();
    }
  }

}

module.exports = MapfileRenderer;

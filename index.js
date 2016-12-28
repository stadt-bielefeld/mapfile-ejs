"use strict";

//-- Modules -------------------------------------------------------------------
let fs = require('fs'); //File reader and writer
let iconv = require('iconv-lite'); //Encoding converter
let chokidar = require('chokidar'); //Watcher
let ejs = require('ejs'); //Renderer for EJS content
//-- Modules -------------------------------------------------------------------

/**
 * The MapfileRenderer watches a directory and renders all EJS mapfiles (*.emap) to mapfiles (*.map).
 */
class MapfileRenderer {

  /**
   * Creates a MapfileRenderer.
   */
  constructor() {
    this._options = {
      inputEncoding: 'utf8',
      outputEncoding: 'utf8',
      ignoreInitial: false
    };
  }

  /**
   * It renders a EJS mapfile (*.emap) to a mapfile (*.map) in the same directory.
   * @param {string} file EJS mapfile (*.emap)
   */
  _renderFile(file) {
    try {

      let inputDataBuffer = fs.readFileSync(file);
      let inputData = iconv.decode(inputDataBuffer, this._options.inputEncoding);
      let outputData = ejs.render(inputData);
      let outputDataBuffer = iconv.encode(outputData, this._options.outputEncoding);
      let newFile = file.replace('.emap', '.map');
      fs.writeFileSync(newFile, outputDataBuffer);

      console.log(newFile + ' was created.');
    } catch (e) {
      console.error(e.message);
    }
  }

  /**
   * It removes the mapfile (*.map) of a EJS mapfile (*.emap).
   * @param {string} file EJS mapfile (*.emap)
   */
  _removeFile(file) {
    let newFile = file.replace('.emap', '.map');
    try {
      fs.unlinkSync(newFile);
      console.log(newFile + ' was deleted.');
    } catch (e) {
      console.error(e.message);
    }
  }

  /**
   * It starts file watching and rendering of EJS mapfiles (*.emap).
   *  @param {string} dir Directory of EJS mapfiles (*.emap)
   *  @param {object} options Options
   *  @param {string} options.inputEncoding Encoding of the input EJS mapfiles (*.emap). Default is utf8.
   *  @param {string} options.outputEncoding Encoding of the output mapfile (*.map). Default is utf8.
   *  @param {boolean} options.ignoreInitial Ignore files on initialization for rendering. Default is false.
   */
  watch(dir, options) {

    //Set options
    if(options){
      this._options = Object.assign(this._options, options);
    }

    //Set file extension for watching
    if (dir.endsWith('/') || dir.endsWith('\\')) {
      dir += '**/*.emap';
    } else {
      dir += '/**/*.emap';
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
      this._removeFile(file);
    });

    //Handle errors
    this._watcher.on('error', (error) => {
      console.error('ERROR: ' + error);
    });
  }

  /**
   * It closes the file watcher.
   */
  close(){
    if(this._watcher){
      this._watcher.close();
    }
  }

}

module.exports = MapfileRenderer;

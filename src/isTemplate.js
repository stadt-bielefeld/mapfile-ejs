
const eFilesRegExp = new RegExp(`[.]e.+$`);

/**
 * Checks is the file has a template file extension.
 * @param {String} file Filename
 * @param {Boolean} eFiles `true`: All e files like *.exml, *.emap, etc. are possible; `false`: Only *.emap is possible.
 * @returns {String|null} If the file is a template, it will return the file without the `e` in the file extension like `filename.map` (from`filename.emap`).
 * @example
 * import { isTemplate } from 'mapfile-ejs';
 * 
 * console.log(isTemplate(`filename.emap`,false)); // filename.map
 * console.log(isTemplate(`filename.ecss`,false)); // null
 * console.log(isTemplate(`filename.ecss`,true));  // filename.css
 * console.log(isTemplate(`filename.map`,false));  // null
 * console.log(isTemplate(`filename.css`,false));  // null
 */
export default function isTemplate(file, eFiles) {

  const fileLowerCase = file.toLowerCase();
  const match = fileLowerCase.match(eFilesRegExp);

  if (match) {
    const outputFile = `${file.substring(
      0,
      file.length - match[0].length
    )}.${match[0].substring(2, match[0].length)}`;

    if(eFiles){
      return outputFile;
    }else{
      if(fileLowerCase.endsWith(`.emap`)){
        return outputFile;
      }else{
        return null;
      }
    }
  }else{
    return null;
  }
}


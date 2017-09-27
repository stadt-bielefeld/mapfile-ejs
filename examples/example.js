let MapfileRenderer = require('../index.js');

//create renderer
let r1 = new MapfileRenderer();
let r2 = new MapfileRenderer();

//watching and rendering in directory 1
r1.watch(__dirname + '/dirOfEjsMapfiles1');

//watching and rendering in directory 2
r2.watch(__dirname + '/dirOfEjsMapfiles2',{
  inputEncoding: 'utf8',
  outputEncoding: 'utf8',
  ignoreInitial: false,
  eFiles: true
});

//stop watching and rendering after 15 sec
setTimeout(() => {
  r1.close();
  r2.close();
},15000);

 var childProcess = require('child_process'),
     ls;

var ls;

var out = 217;


 ls = childProcess.exec('node lib/test2.js', function (error, stdout, stderr) {
   if (error) {
     console.log('Signal received: '+error.signal);
   }
   out = stdout;
   ausgabe(stdout);
 });

 ls.on('exit', function (code) {
   // console.log('Child process exited with exit code '+out);
 });


 ls.on('data', function (code) {
   // console.log('Child process returned data '+code);
 });
 

function ausgabe(ret) {
	console.log("Das ist die Ausgabe " + ret);
};

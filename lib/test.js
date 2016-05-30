var textract = require('textract');
var mammoth = require("mammoth");
var util = require("util");

var fs = require('fs');
var html = fs.readFileSync('index.js', 'utf8');
console.log(html);


/*
if (mammoth) console.log("Mammut");

	mammoth.convertToHtml({path: "../instance.docx"})
	    .then(function(result){
	        var html = result.value; // The generated HTML
	        // console.log(html);
	        
	        var messages = result.messages; // Any messages, such as warnings during conversion
	    })
	    .done();


textract.fromFileWithPath("../instance.docx", function( error, text ) {
	console.log(text);
});
*/
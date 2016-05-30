var textract = require('textract');
var mammoth = require("mammoth");


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
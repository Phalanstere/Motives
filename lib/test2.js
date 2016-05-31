var textract = require('textract');
var mammoth = require("mammoth");
var util = require("util");

mammoth.convertToHtml({path: "instance.docx"})
	    .then(function(result){
	        var html = result.value; // The generated HTML
	        // console.log(html);
	        
	        process.stdout.write(html);
	        
	        var messages = result.messages; // Any messages, such as warnings during conversion
	    })
	    .done();







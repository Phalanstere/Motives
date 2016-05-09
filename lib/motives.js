/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */ /*global define */
/*global $, jQuery, alert, console*/

var test;

function Association(no, obj){
    "use strict";
    var self = this;
    this.id  = null;
    test	= obj;

	this.init = function(){
		self.fulltext	= obj.fulltext;
	    self.abstract	= obj.abstract;
	    self.link		= obj.link;
	    self.title		= obj.title;
	    self.id = "association_" + no;
        var s;
        s = '<div id = "' + self.id + '" class = "association" no= "' + no + '">' + obj.title + '</div>';
        $("#"+ obj.div).append(s);        
        $("#"+ self.id).draggable();


    };
    
    self.init();
}


function Motives(div) {
"use strict";
var self = this;
this.div_id = div;
this.div = null; // holds the dom element, if specified  

this.menu_id = "motives_menu";

this.associations = [];


this.new_association = function() {
  var n = self.associations.length, 
      x, 
      s, 
      obj;
      
      $("#AssociationInput").remove();
      
	  s = '<div id = "AssociationInput">';
	 
	    s += '<label for="AssocTitle">title<input id="AssocTitle"></label>';
	    s += '<label for="AssocAbstract">abstract<textarea id = "AssocAbstract" rows="4" cols="50">your abstract</textarea></label><br>'; 
	
	   
	    s += '<label for="AssocFulltext">fulltext<textarea id = "AssocFulltext" rows="6" cols="50">your fulltext</textarea></label><br>'; 
	    s += '<label for="AssocLink">link<input id="AssocLink"/></label><br>';
	    
	    s += '<input id = "AssociationFile" type="file" name="file" id="file" />';
	    
	    
	    s += '<div id = "AssociationSubmit">SUBMIT</div><br>';
	      
	  s += '</div>';
	    
	  $("body").append(s);  
  
  $("#AssocLink").focus(function(){
	$("#AssociationFile").trigger('click');
	
	$("#AssociationFile").change(function(){
		var x = $(this).val();
		$("#AssocLink").val(x);
	});
	
  });
  
  $("#AssociationSubmit").click(function(){
	obj = {};
	obj.div			= self.div_id;
	obj.title		= $("#AssocTitle").val();
	obj.abstract	= $("#AssocAbstract").val();	
	obj.fulltext	= $("#AssocFulltext").val();	
	obj.link		= $("#AssocLink").val();	

	
	x = new Association(n, obj);
	self.associations.push(x);
	
	$("#AssociationInput").fadeOut();
  });
  
      


};

//
this.export_json = function() {
	var text = JSON.stringify(self.associations, null, 2);
	alert(text);
};

 
//creates the menu
this.menu = function(){

    if (div)  { self.menu_id = div + "_" + self.menu_id; }
    
    var s;
    s = '<div id = "' + self.menu_id + '" class = "motives_menu"></div>';
    self.div.innerHTML = s;
    self.toolbar = document.getElementById(self.menu_id);
    
    s = '<div id = "new_association" class = "motives_block"></div>';
    $("#" + self.menu_id).append(s);
    
    s = '<div id = "association_json" class = "motives_block">json</div>';
    $("#" + self.menu_id).append(s);    
    
    
    // creates a new association;    
    $("#" + self.menu_id + " #new_association").click(function(){
     self.new_association();
    });
    
    
    // creates a new association;    
    $("#" + self.menu_id + " #association_json").click(function(){
		self.export_json();
    });
        
    
    
};

 
// initialize 
this.init = function() {
    var s;
    
    if (div) {  
        self.div = document.getElementById(div);        
        }
        else {
            self.div_id = "motives_page";
            s = '<div id = "motives_page" class = "motives_page"></div>';
            $("body").html(s);
            self.div = document.getElementById("motives_page");        
            }
        
    self.menu();    

    
    };
    
self.init();
}



function Go(){
 x = new Motives();
 
};

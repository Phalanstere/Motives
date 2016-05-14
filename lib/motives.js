/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */ /*global define */
/*global $, jQuery, alert, console*/
var $ = require("jquery");
require('jquery-ui');
var fs = require('browserify-fs');



var test;

function Association(no, obj){
    "use strict";
    var self = this;
    this.id  = null;
    test	= obj;

	// edit function
	this.edit = function() {
		var s;
		
		$("#AssociationInput").remove();
		s = '<div id = "AssociationInput">';
		
		s += '<div id = "exit">X</div>';		
		
		s += '<label for="AssocTitle">title<input id="AssocTitle" value= "' + self.title + '"></label>';
	    s += '<select id = "Color"><option value="' + self.color + '" style= "background:' + self.color + '">' + self.color + '</option>';
	    
	    s += '<option value="lightcoral" style= "background:lightcoral">lightcoral</option>';
	    s += '<option value="mistyrose" style= "background:mistyrose">mistyrose</option>';
	    s += '<option value="sandybrown" style= "background:sandybrown">sandybrown</option>';
	    s += '<option value="wheat" style= "background:wheat">wheat</option>';
	    s += '<option value="greenyellow" style= "background:greenyellow">greenyellow</option>';
	    s += '<option value="darkseegreen" style= "background:darkseegreen">darkseegreen</option>';
	    s += '<option value="paleturquoise" style= "background:paleturquoise">paleturquoise</option>';		
	    s += '<option value="skyblue" style= "background:skyblue">skyblue</option>';				
	    s += '<option value="plum" style= "background:plum">plum</option>';		
	    s += '<option value="pink" style= "background:pink">pink</option>';			
		s += '</select>';


	    s += '<label for="AssocAbstract">abstract<textarea id = "AssocAbstract" rows="4" cols="50">' + self.abstract + '</textarea></label><br>'; 
	    s += '<label for="AssocFulltext">fulltext<textarea id = "AssocFulltext" rows="6" cols="50">' + self.fulltext + '</textarea></label><br>'; 
	    s += '<label for="AssocLink">link<input id="AssocLink"/></label><br>';
	    
	    s += '<input id = "AssociationFile" type="file" name="file" id="file" />';
	    s += '<div id = "AssociationSubmit">UPDATE</div><br>';
	      
	  s += '</div>';
	    
	  $("body").append(s); 
	  
	  $("#AssociationInput #Color").css("background", self.color);
	
	  $("#AssociationInput #Color").change(function(){
		var c = $(this).val();
		$(this).css("background", c);
		});
  
  
	  $("#AssociationInput #exit").click(function(){
		$("#AssociationInput").fadeOut();
		});  
  
  
  
	  $("#AssociationSubmit").click(function(){
		self.title		= $("#AssocTitle").val();
		self.abstract	= $("#AssocAbstract").val();	
		self.fulltext	= $("#AssocFulltext").val();	
		self.link		= $("#AssocLink").val();	
		self.color		= $("#AssociationInput #Color").val();	
		
		console.log("Hier folgt der Update");
		console.log("Ich aktualisiere " + self.color);
		
		self.update();
		
		$("#AssociationInput").fadeOut();
	  });
	
		
	};


	// updates the element
	this.update = function(){
		

		$("#" + self.id).remove();
		

		
		var s;
		s = '<div id = "' + self.id + '" class = "association" no= "' + no + '" title = "' + self.abstract + '">' + self.title + '</div>';
		$("#"+ obj.div).append(s);   

		console.log("JETZT");

		
		
		$("#"+ self.id).css({
			left: self.left,
			top: self.top,
			backgroundColor: self.color
		});	
		
		
		
		
		
		$("#"+ self.id).draggable({
			stop: function( event, ui ) {
								
				var pos = $(this).position();

				self.top	= (pos.top / parseInt($("#" + obj.div).css("height"), 10)).toFixed(5) *100 + "%";
				self.left	= (pos.left / parseInt($("#" + obj.div).css("width"), 10)).toFixed(5) *100 + "%";
			}
        });

		
		$("#" + self.id).click(function(){
			self.edit();
		});	
		
	};


	// creates the item on the screen
	this.init = function(){
		self.fulltext	= obj.fulltext;
	    self.abstract	= obj.abstract;
	    self.link		= obj.link;
	    self.title		= obj.title;
	    self.color		= obj.color;
	    self.top		= 50;
	    self.left		= 50;
	    
	    self.id = "association_" + no;
        var s;
        s = '<div id = "' + self.id + '" class = "association" no= "' + no + '" title = "' + obj.abstract + '">' + obj.title + '</div>';
       
       
        $("#"+ obj.div).append(s);      
          
        $("#"+ self.id).draggable({
			stop: function( event, ui ) {
								
				var pos = $(this).position();

				self.top	= (pos.top / parseInt($("#" + obj.div).css("height"), 10)).toFixed(5) *100 + "%";
				self.left	= (pos.left / parseInt($("#" + obj.div).css("width"), 10)).toFixed(5) *100 + "%";
			}
        });

		$("#" + self.id).css("background", obj.color);
		
		$("#" + self.id).click(function(){
			self.edit();
		});	
		

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
	 
	 
	 	s += '<div id = "exit">X</div>';	
	 
	    s += '<label for="AssocTitle">title<input id="AssocTitle"></label>';
	    s += '<select id = "Color"><option value="gainsboro" style= "background:gainsboro">gainsboro</option>';
	    
	    s += '<option value="lightcoral" style= "background:lightcoral">lightcoral</option>';
	    s += '<option value="mistyrose" style= "background:mistyrose">mistyrose</option>';
	    s += '<option value="sandybrown" style= "background:sandybrown">sandybrown</option>';
	    s += '<option value="wheat" style= "background:wheat">wheat</option>';
	    s += '<option value="greenyellow" style= "background:greenyellow">greenyellow</option>';
	    s += '<option value="darkseegreen" style= "background:darkseegreen">darkseegreen</option>';
	    s += '<option value="paleturquoise" style= "background:paleturquoise">paleturquoise</option>';		
	    s += '<option value="skyblue" style= "background:skyblue">skyblue</option>';				
	    s += '<option value="plum" style= "background:plum">plum</option>';		
	    s += '<option value="pink" style= "background:pink">pink</option>';			
		s += '</select>';


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
  
  
	$("#AssociationInput #exit").click(function(){
		$("#AssociationInput").fadeOut();
	});  
  
  
  $("#AssociationInput #Color").change(function(){
	var c = $(this).val();
	$(this).css("background", c);
  });
  
  $("#AssociationSubmit").click(function(){
	obj = {};
	obj.div			= self.div_id;
	obj.title		= $("#AssocTitle").val();
	obj.abstract	= $("#AssocAbstract").val();	
	obj.fulltext	= $("#AssocFulltext").val();	
	obj.link		= $("#AssocLink").val();	
	obj.color		= $("#AssociationInput #Color").val();	
	
	x = new Association(n, obj);
	self.associations.push(x);
	
	$("#AssociationInput").fadeOut();
  });
  
      


};

//
this.export_json = function() {
	var text = JSON.stringify(self.associations, null, 2);
	console.log("sollte das in einer Datenbank speichern");	
	
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


if (typeof(module) !== "undefined") {
	module.exports = exports = Motives;
	}



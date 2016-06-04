/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */ /*global define */
/*global $, jQuery, alert, console*/
var $ = require("jquery");
require('jquery-ui');
var fs = require('fs');
var util = require('util');
var Datastore	= require('nedb');

var test;

Array.prototype.contains = function (elem) {
"use strict";
var q;

for (q = 0; q < this.length; q++)
    {
    if (elem === this[q]) 
        {
        return true;
        }
    }

return false;
};



function Association(no, obj, parent){
    "use strict";
    var self = this;
    this.id  = null;
    test	= obj;

	// edit function
	this.edit = function() {
		var s, tmp;
		
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
	    
	    s += '<label for="AssocTags">tags<input id="AssocTags" value = "' + self.tags + '"/></label><br>';
	    
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
  
  
  
	  $("#AssociationInput #AssociationSubmit").click(function(){
		self.title		= $("#AssocTitle").val();
		self.abstract	= $("#AssocAbstract").val();	
		self.fulltext	= $("#AssocFulltext").val();	
		self.link		= $("#AssocLink").val();	
		self.color		= $("#AssociationInput #Color").val();	
		
		tmp = $("#AssocTags").val();
		tmp = tmp.replace(/ /g,"");
		tmp = tmp.split(',');
		
		self.tags = tmp;
		
		
		
		console.log("Hier folgt der Update");
		console.log("Ich aktualisiere " + self.color);
		
		self.update();
		
		$("#AssociationInput").fadeOut();
	  });
	
		
	};


	// updates the element, this affects mainly the display area
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
				
				console.log("STOP DRAGGING - UPDATE");
				
				parent.save_project();
				
			}
        });

		
		$("#" + self.id).click(function(){
			self.edit();
		});	
		
		
		parent.save_project();
		
	};


	// creates the item on the screen
	this.init = function(){
		self.fulltext	= obj.fulltext;
	    self.abstract	= obj.abstract;
	    self.link		= obj.link;
	    self.title		= obj.title;
	    self.color		= obj.color;
	    
	    self.tags		= obj.tags;
	    
		if (! obj.top)	{self.top	= 50;	} 
		else { self.top = obj.top;}
	    
	    if (! obj.left)	{self.left	= 50; }
		else { self.left = obj.left;}
	    
	    
	    
	    self.id = "association_" + no;
        var s;
        s = '<div id = "' + self.id + '" class = "association" no= "' + no + '" title = "' + obj.abstract + '">' + obj.title + '</div>';
       
       
        $("#"+ obj.div).append(s);      
        
        $("#" + self.id).css({
			left:	obj.left,
			top:	obj.top
        });
        
        
          
        $("#"+ self.id).draggable({
			stop: function( event, ui ) {
								
				var pos = $(this).position();

				self.top	= (pos.top / parseInt($("#" + obj.div).css("height"), 10)).toFixed(5) *100 + "%";
				self.left	= (pos.left / parseInt($("#" + obj.div).css("width"), 10)).toFixed(5) *100 + "%";
				
				console.log("STOP DRAGGING - UPDATE");
                parent.save_project();
				
			}
        });

		$("#" + self.id).css("background", obj.color);
		
		$("#" + self.id).click(function(){
			self.edit();
		});	
	
	
    parent.save_project();

    };
    
    self.init();
}


function Motives(div, json) {
"use strict";
var self = this;

this.title	= null;
this.div_id = div;
this.div = null; // holds the dom element, if specified  

this.menu_id = "motives_menu";

this.associations = [];

this.projects	  = []; // an array that holds all the stored projects - kind of a meta oject

this.paint_associations = function(list){
	var i, 
		obj,
		x; 
	
	for (i = 0; i < list.length; i++ ) {
		obj = {};
		obj.div			= self.div_id;
		obj.title		= list[i].title;
		obj.abstract	= list[i].abstract;	
		obj.fulltext	= list[i].fulltext;	
		obj.tags		= list[i].tags;
		obj.link		= list[i].link;	
		obj.color		= list[i].color;	
		obj.top			= list[i].top;
		obj.left		= list[i].left;		
		
		
		x = new Association(i, obj, self);
		self.associations.push(x);

		}  



};




// checks if the title is already used by another project
this.check_title = function(title) {
    var i;
    
	for (i = 0; i < self.projects.length; i++) {
	    if (title === self.projects[i].title) { return false; }
	}
	
	return true;
};


this.reset_select = function(id) {
  self.load_ndb();  
};


this.new_project = function() {
	$(".association").remove();
	self.associations = [];
	
	var s= "", 
	   title;
	
	$(".motives_prompt").remove();
	
	s  = '<div class = "motives_prompt">';
	   s += '<input id="project_title" value ="enter the project title"/>';
        s += '<div class = "submit">SUBMIT</div>';

	s += '</div>';

	
    $(".motives_page").append(s);   
	
    $(".motives_prompt input").focus(function(){
        $(this).val(""); 
       }); 	
	
    $(".motives_prompt .submit").click(function(){
        title = $(".motives_prompt input").val();
        if (self.check_title(title) === true) {
            self.title = title;
            self.save_ndb(self.reset_select);
            $(".motives_prompt").fadeOut();
            
        } else {
        alert("this title is already in use");    
        }
    });
	
};


this.change_title = function() {
    var s= "", 
       title;
    $(".motives_prompt").remove();
    
    $(".motives_prompt").remove();
    
    s  = '<div class = "motives_prompt">';
       s += '<input id="project_title" value ="enter the project title"/>';
        s += '<div class = "submit">SUBMIT</div>';

    s += '</div>';

    
    $(".motives_page").append(s);   
    
    $(".motives_prompt input").focus(function(){
        $(this).val(""); 
       });  
    
    $(".motives_prompt .submit").click(function(){
        title = $(".motives_prompt input").val();
        if (self.check_title(title) === true) {
            self.title = title;

        self.db.update({ _id: self.id }, { $set: { title: self.title } }, { multi: false }, function (err, numReplaced) {
            console.log("Datenbank aktualisiert");
            $(".motives_prompt").fadeOut();
        });
            
        } else {
        alert("this title is already in use");    
        }
    });
    
    
};


this.paint_project_info = function(project){
    var s;
    $(".motives_page #info").remove();
    s = '<div title = "click this to change the project\'s title" id = "info">' + project.title + '</div>';
    
    $(".motives_page").append(s);
    
    $(".motives_page #info").click(function(){
        self.change_title();
    /*
    var title = prompt("Please enter the new title", "");
    if (title !== null) {
        $(".motives_page #info").html(title);
        self.title = title;

        self.db.update({ _id: self.id }, { $set: { title: self.title } }, { multi: false }, function (err, numReplaced) {
            console.log("Datenbank aktualisiert");
        });


        }
    */

    });
};




// updates the elements in  the select field
this.update_projects = function() {
	var i, s = "", pr;
	
	for (i = 0; i < self.projects.length; i++ ) {
		pr = self.projects[i];

	    s += '<option value="' + i + '">' + pr.title + '</option>';
	}
	
	$("#select_project").append(s);
	
	self.set_active_project();
	
	
	$("#select_project").change(function(){
		var x = parseInt( $(this).val() , 10);
		console.log("Projektwechsel");
		self.select_project(x);
	});
	
};





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
	    s += '<label for="AssocFulltext">fulltext<textarea id = "AssocFulltext" cols="50">your fulltext</textarea></label><br>'; 
	    s += '<label for="AssocLink">link<input id="AssocLink"/></label><br>';
	    
	    s += '<input id = "AssociationFile" type="file" name="file" id="file" />';    

	    s += '<label for="AssocTags">tags<input id="AssocTags"/></label><br>';

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
	
	x = new Association(n, obj, self);
	self.associations.push(x);
	
	$("#AssociationInput").fadeOut();
  });
  
      


};

 // this should copy the thing to the clipboard
 this.copy_to_clipboard = function() {

  var node = document.getElementById("association_text" ), 
  range;

    if ( document.selection ) {
        range = document.body.createTextRange();
        range.moveToElementText( node  );
        range.select();
    } else if ( window.getSelection ) {
        range = document.createRange();
        range.selectNodeContents( node );
        window.getSelection().removeAllRanges();
        window.getSelection().addRange( range );
    }
};


//
this.export_json = function() {
	var text = JSON.stringify(self.projects, null, 2), 
	doc, 
	s;

	doc = document.getElementById("AssociationJSON");
	if (!doc) {
		s = '<div id = "AssociationJSON">';
			s += '<div id = "exit">X</div>';
			s += '<div id = "association_text">' + text + '</div>';
			
			s += '<div id = "submit">CLICK + CTRL-C</div>';
			s += '</div>';
			
		$("body").append(s);
		
		$("#AssociationJSON #submit").click(function(){
			self.copy_to_clipboard();
			});
		
		
		$("#AssociationJSON #exit").click(function(){
			$("#AssociationJSON").remove();	
			});
	}
	
};



// loads the *.json files
this.load_files = function() {
	var html = fs.readFileSync('files/test.json', 'utf8');
	console.log(html);

	self.dir = './files';

	var files = fs.readdirSync('./files');
	//var files = fs.readdirSync('./files/sub');
	self.show_files(files);

};

// display the files, so the user can select one
this.show_files = function(files) {
	var i = 0,
		s = '<select id = "ProjectChoice"><option value="0" style= "background:lightgreen">select file</option>';
	
	for (i = 0; i < files.length; i++ ) {
		s += '<option value="' + files[i] + '" style= "background:lightcoral">' + files[i] + '</option>';
	}
	
	s += '<select/>';
	
	$("body").append(s); 
	
	
	$("#ProjectChoice").change(function(){
		var x = $(this).val();
		alert("hier tut sich was " + x);
	});
	
};





 
//creates the menu
this.menu = function(){

    if (div)  { self.menu_id = div + "_" + self.menu_id; }
    
    var s;
    s = '<div id = "' + self.menu_id + '" class = "motives_menu"></div>';
    self.div.innerHTML = s;
    self.toolbar = document.getElementById(self.menu_id);
    
    s = '<div id = "new_association" title ="creates a new item" class = "motives_block">new item</div>';
    // $("#" + self.menu_id).append(s);


    s += '<div id = "new_project" title = "creates a new project" class = "motives_block">new_project</div>';
    // s += '<div id = "save_project" class = "motives_block">save</div>';
    s += '<div id = "delete_project" title = "deletes current project" class = "motives_block">delete_project</div>';
    
    s += '<div id = "association_json" title = "exports projects as json file" class = "motives_block">json_export</div>';
    // s += '<div id = "association_load" class = "motives_block">load</div>';
    // s += '<div id = "association_test" class = "motives_block">tract</div>';
   
    // s += '<div id = "association_save" class = "motives_block">save ndb</div>';
    // s += '<div id = "association_projects" class = "motives_block">load ndb</div>';
    
    s += '<select id = "select_project" title = "select a project"></select>';

    s += '<div id = "search">';        
		s += '<input title = "scan your projects via fulltext search" id="fulltext_search" value= "search text"/>';
		s += '<input id="tag_search" title ="scan your projects via tag search" value= "search tags"/>';		
	s += '</div>';        
        
    
    $("#" + self.menu_id).append(s);    
    


    // creates a new project;    
    $("#" + self.menu_id + " #new_project").click(function(){
     self.new_project();
    });
    
    
    // update the current project;    
    $("#" + self.menu_id + " #save_project").click(function(){
     self.save_project();
    });    
    
    // delete the current project;    
    $("#" + self.menu_id + " #delete_project").click(function(){
     self.delete_project();
    });       
    
    
    
    
    // creates a new association;    
    $("#" + self.menu_id + " #new_association").click(function(){
     self.new_association();
    });
    
    // creates a new association;    
    $("#" + self.menu_id + " #association_load").click(function(){
		self.load_files();
    });    
    
    // saves the association    
    $("#" + self.menu_id + " #association_save").click(function(){
		self.save_ndb();
		// self.dump_ndb();
    });     
    
    // reads all the projects
    $("#" + self.menu_id + " #association_projects").click(function(){
		self.load_ndb();
    });      
    
    // fulltext search focus  
    $("#" + self.menu_id + " #fulltext_search").focus(function(){
		$(this).val("");
    });  
    
    
    // fulltext search  
    $("#" + self.menu_id + " #fulltext_search").change(function(){
		var v = $(this).val();
		self.full_search(v);
    });      
    
    
    // tag search focus  
    $("#" + self.menu_id + " #tag_search").focus(function(){
		$(this).val("");
    });  
    
    // tag search  
    $("#" + self.menu_id + " #tag_search").change(function(){
		var v = $(this).val();
		self.tag_search(v);
		// self.full_search(v);
    });        
    
    
    
    
    // exports json;    
    $("#" + self.menu_id + " #association_json").click(function(){
		self.export_json();
    });
        
    // file change;    
    $("#" + self.menu_id + " #association_test").click(function(){

	alert("MAMMOTH");
	
	




    });        
        
        
    
    
};


this.search_association = function(assoc, regex) {
	var n = assoc.title.search(regex);
	if (n === -1) {
		n = assoc.abstract.search(regex);
		if (n === -1) {
			n = assoc.fulltext.search(regex);
			}
		
		}
	
	return n;
};


this.full_search = function(phrase){
	var i,
		j,
		pr,
		reg = new RegExp(phrase),
		tmp,
		o,
		res = [];
	
	for (i = 0; i < self.projects.length; i++ ) {
		pr = self.projects[i];
		
		console.log("Länge Array " + pr.associations.length);
		
		for (j = 0; j < pr.associations.length; j++ ) {
			tmp = self.search_association(pr.associations[j], reg);
			if (tmp !== -1) {
				o = {};
				o.project_id = i;
				o.assoc_id	 = j;
				res.push(o);	
			}
		}
		
	}
	
	self.show_search_results(res);
};


this.tag_search = function(phrase) {
	var i,
		j,
		pr,
		tmp,
		o,
		res = [];	
		
	// var x = ["a", "b", "c"];
	// if (x.contains("a") === true) alert("BIN DA") ;	
		
		
	for (i = 0; i < self.projects.length; i++ ) {
		pr = self.projects[i];
		
		for (j = 0; j < pr.associations.length; j++ ) {
			tmp = pr.associations[j];
			if (tmp.tags) {
				console.log(tmp.tags + "PHASE " + phrase);
				if (tmp.tags.contains(phrase) === true) {
					o = {};
					o.project_id = i;
					o.assoc_id	 = j;
					res.push(o);
				}
				
			}
		}
		
	}
		
alert(res.length);
self.show_search_results(res);	
};



// shows search results
this.show_search_results = function(res){
	// alert("Suchresultate " + res.length);
	var d = document.getElementById("search_results"),
		h,
		i,
		title,
		project,
		s ="";

		
	if (d === null) {
		s += '<div id = "search_results">';
			s += '<div id = "exit">X</div>';
			s += '<div id = "field"></div>';	
		s += '</div>';
		
		$(".motives_page").append(s);	
		
		h = window.innerHeight -38;
		$(".motives_page #search_results").css({
			height: h
			});
		
		
		$(".motives_page #search_results #exit").click(function(){
			$(".motives_page #search_results").fadeOut();
			});
		}
	else {
	$(".motives_page #search_results").fadeIn();	
	}
	
	// not the text display
	s = "";
	for (i = 0; i < res.length; i++ ) {
		project = self.projects[res[i].project_id].title;
		title	= self.projects[res[i].project_id].associations[res[i].assoc_id].title;
		
		
		
		s += '<div class = "result" project="' + res[i].project_id + '" assoc = "' +  res[i].assoc_id + '"><span class ="assoc_link">' + title + '</span><span class = "project_link">In: ' + project + '</span></div>';
	}
	
	$(".motives_page #search_results #field").html(s);
	
	$(".motives_page #search_results .assoc_link").click(function(){
		
		var ass = $(this).parent().attr("assoc"),
			pro	= $(this).parent().attr("project");
			self.show_association(pro, ass);
	});

	$(".motives_page #search_results .project_link").click(function(){
		var pro	= parseInt( $(this).parent().attr("project"), 10);
		self.select_project(pro);
		self.set_active_project();
		
	});

	
	
};


this.show_association_window = function() {
	var d = document.getElementById("association_window"),
		h,
		s ="";
		
	if (d === null) {

		s += '<div id = "association_window">';
			s += '<div id = "exit">X</div>';
			s += '<div id = "field">';	
			
			s += '<label for="AssocTitle">title<input id="AssocTitle" value= "' + self.title + '"></label>';
			s += '<label for="AssocAbstract">abstract<textarea id = "AssocAbstract" rows="4" cols="50">' + self.abstract + '</textarea></label><br>'; 
			s += '<label for="AssocFulltext">fulltext<textarea id = "AssocFulltext" rows="6" cols="50">' + self.fulltext + '</textarea></label><br>'; 
			s += '<label for="AssocLink">link<input id="AssocLink"/></label><br>';

			s += '<label for="AssocTags">tags<input id="AssocTags"/></label><br>';
			
		    s += '<div id = "AssociationSubmit">UPDATE</div><br>';
			
			
			
			s += '</div>';
		s += '</div>';

		$(".motives_page").append(s);	
		
		h = window.innerHeight -38;
		$(".motives_page #association_window").css({
			height: h
			});
			
		$(".motives_page #association_window #exit").click(function(){
		    $(".motives_page #association_window").fadeOut();
			});
			
			
		$(".motives_page #association_window #AssociationSubmit").click(function(){
			var pr = parseInt( $("#association_window").attr("project"), 10 ),
				assoc = parseInt( $("#association_window").attr("assoc"), 10 ),
				t, 
				temp;
				
				t = self.projects[pr].associations[assoc];
				t.title = $(".motives_page #association_window #AssocTitle").val();
				t.abstract = $(".motives_page #association_window #AssocAbstract").val();
				t.fulltext = $(".motives_page #association_window #AssocFulltext").val();		
				
				temp	   = $(".motives_page #association_window #AssocTags").val();		 
						
						
				temp = temp.replace(/ /g,"");
				temp = temp.split(',');
				t.tags = temp;
				
				
					
				self.save_project_by_id(pr);		

			// self.update_association();
			});			
			
			
	}

	$(".motives_page #association_window").fadeIn();	

};


// shows the respective association, if a search result is clicked
this.show_association = function(project, assoc) {
	self.show_association_window();
	var a = self.projects[project].associations[assoc];
	
	$("#association_window #AssocTitle").val(a.title);
	$("#association_window #AssocAbstract").val(a.abstract);
	$("#association_window #AssocFulltext").val(a.fulltext);
	
	$("#association_window #AssocTags").val(a.tags);	
	
	$("#association_window").attr("assoc", assoc);		
	$("#association_window").attr("project", project);		
		
};




// initializes the local database
this.init_db = function() {
	
    self.db = new Datastore({ filename: 'db/motives.db' });
    console.log("Initialisierung der Datenbank");
    
	self.db.loadDatabase(function (err) {    // Callback is optional
		console.log("Datenbank eingelesen");
		
		self.load_ndb();
    });
	
};

// this loads all the projects stored in the nedb
this.load_ndb = function() {
	self.projects = [];
	
	$("#select_project").html("");
	
	self.db.find({}, function (err, docs) {
	console.log("Anzahl Dateien " + docs.length);
    self.projects = docs;
    // self.sort_templates();
    self.update_projects();

    });
};


this.dump_ndb = function() {
	console.log("Alle Elemente löschen");
	self.db.remove({}, { multi: true }, function (err, numRemoved) {
		console.log("Alles gelöscht");
	});
};




this.get_project = function(id) {
	var i;
	
	for (i = 0; i < self.projects.length; i++ ) {

		
		if (self.projects[i]._id === id) {
			return i;
			}
		}	
	return -1;
};

this.set_active_project = function(){
	var no = self.get_project(self.id);
	var dom = document.getElementById("select_project");
	dom.value = no.toString();
	// $("#select_projekct").	
	
};



this.save_project_by_id = function(id) {
	
	var p = self.projects[id];

	self.db.update({ _id: p._id }, { $set: { associations: p.associations } }, { multi: false }, function (err, numReplaced) {
		console.log("Datenbank aktualisiert");
		$("#select_project").html("");
		self.load_ndb();
		
	});

};


this.update_single_project = function(id) {
    var loaded, 
    no, p
    
    self.db.find({_id: id}, function (err, docs) {
        loaded = docs[0];
        self.id    = loaded._id;
    
        no = self.get_project(id);
        p = self.projects[no];
        p.associations = docs[0].associations;
        

        });


};


// storage of the project
this.save_project = function() {
	var doc = {};
	doc.title = self.title;
	doc.associations = self.associations;
	doc._id = self.id;
	
	
	console.log("SICHERE: " + doc.title + " Länge " + doc.associations.length );
	
	self.db.update({ _id: self.id }, { $set: { associations: self.associations } }, { multi: true }, function (err, numReplaced) {
		console.log("Datenbank aktualisiert über save_project " + numReplaced);
		
		self.update_single_project(self.id);
		
		// $("#select_project").html("");
		// self.load_ndb();
		
	});
}; 


// delete the current project
this.delete_project = function() {

    $(".association").remove();
    $("#motives_page #info").html("");

	self.db.remove({ _id: self.id }, {}, function (err, numRemoved) {
	  // numRemoved = 1
	   console.log("SSUCCESSFULL");
       self.load_ndb();
	});

};




this.save_ndb = function(callback) {
	if (! self.current_project) {
		
		console.log("Speichern in der Datenbank ");
		
		var doc = {};
		doc.title = self.title;
		doc.associations = self.associations;
		
		
		self.db.insert(doc, function (err, newDoc) {   // Callback is optional
			console.log(newDoc.title);
			console.log(newDoc._id);
			
			if (callback) {
			    callback.call(this, newDoc._id);
			}
		});
		
	}
	
};



this.select_project = function (no) {
	
	$(".association").remove();
	self.associations = [];
	
	var temp = self.projects[no],
	loaded;

    self.db.find({_id: temp._id}, function (err, docs) {
        loaded = docs[0];
        self.id    = loaded._id;
        self.title = loaded.title;
        
        self.paint_associations(loaded.associations);
        self.paint_project_info(loaded);
    
        });


	/*
	var temp = self.projects[no];
	self.title = temp.title;
	self.id	   = temp._id;
	
	self.paint_associations(temp.associations);
	self.paint_project_info(temp);
	*/
};


this.load_project = function(file){
	var fl = "./files/" + file,
	x;

	
        $.get(fl, function(data) {
            if (data) {
				x = data;
                console.log (  x.length );
                self.paint_associations(data);
            }
        });	

};

 
// initialize 
this.init = function() {
    var s;
    
    // reads in the local database
	self.init_db();
    
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

    if (json) {
		self.load_project(json);
		}
    
    };
    
self.init();
}






if (typeof(module) !== "undefined") {
	module.exports = exports = Motives;
	}



/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */ /*global define */
/*global $, jQuery, alert, console*/


function Association(no, div){
    "use strict";
    var self = this;
    this.id  = null;
   
    this.init = function(){
        self.id = "association_" + no;
        var s, input;
        
        input = prompt("Please enter the keyword", "input");
        
        if (input)
            {
            s = '<div id = "' + self.id + '" class = "association">' + input + '</div>';

            $("#"+ div).append(s);
        
            $("#"+ self.id).draggable();
            }

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
      x;
      
 x = new Association(n, self.div_id);
 self.associations.push(x);   

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
    
    // creates a new association;    
    $("#" + self.menu_id + " #new_association").click(function(){
     self.new_association();
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

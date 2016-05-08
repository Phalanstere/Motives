/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */ /*global define */
/*global $, jQuery, alert, console*/


function Motives(div) {
"use strict";
var self = this;
this.div = null; // holds the dom element, if specified  

this.menu_id = "motives_menu";

 
//creates the menu
this.menu = function(){

    if (div)  { self.menu_id = div + "_" + self.menu_id; }
    
    var s;
    s = '<div id = "' + self.menu_id + '" class = "motives_menu"></div>';
    self.div.innerHTML = s;
    self.toolbar = document.getElementById(self.menu_id);
    
    s = '<div id = "new_association" class = "motives_block"></div>';
    $("#" + self.menu_id).append(s);
    
    
    $("#" + self.menu_id + " #new_association").click(function(){
     alert("Hier kommt was");   
    });
    
    
};

 
// initialize 
this.init = function() {
    var s;
    
    if (div) {  
        self.div = document.getElementById(div);        
        }
        else {
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

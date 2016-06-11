# Motives

This package allows you to create and administer various mindmaps. It could be used as a writer's tool for screenplays, novels etc.
Since it uses **nedb** local storage there is no need for a server or a seperate database 


## Installation

You may download the zipped file or install it via npm 
 
```javascript
	npm install motives
``` 

## Minimal index file

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>LoopedEvents Minimal</title>

   <link href='http://fonts.googleapis.com/css?family=Oswald|Inconsolata' rel='stylesheet' type='text/css'>
   <link rel="stylesheet" href="node_modules/motives/css/styles.css">


  </body>
</html>
``` 



## Usage

```javascript
	var Motives = require("motives");
	var m = new Motives(null, null)
``` 


The second parameter hold the div you want the programm to appear in. If set to **null** (which is recommended) it takes over the whole screen. The third parameter takes a json object which allows you to import a given project.  

A full index.s file that can be built with **browserify** might look like this:

```javascript
"use strict";
var $ = require("jquery");
var Motives 	= require("./motives.js");

var d;

$( document ).ready(function() {
	d = new Motives(null, null);	

});
``` 


Since the local [**nedb**](https://github.com/louischatriot/nedb) database is embedded  you can store your information locally.



<img src="http://burckhardt.ludicmedia.de/Motives.png">


##Desktop Application

There is a [full fledged desktop application](https://github.com/Phalanstere/WritersStudio) - created via electron - that you might use. 
The advantage of this version is that it utilizes the local file system and allows the linkage of document or online files.

In this version the program does not only serve as a mind map, but as a general meta-organizational tool. 









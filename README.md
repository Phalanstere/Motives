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

    <script src="bundle.js"></script> 


  </body>
</html>
``` 


## Usage

```javascript
	var motives = require("motives");
``` 

Just requiring creates an instance of the program, that you can manipulate via **$(".motives_page")**

Since a local database is embedded [**nedb**](https://github.com/louischatriot/nedb) you can store your information locally.


If you want to use it as a desktop application, [have a look](https://github.com/Phalanstere/WritersStudio) here







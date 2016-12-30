var hbs = require('handlebars');
var readFileSync = require('fs').readFileSync;

var helpers = {};

helpers.makeLink = function(text, url){		 
	var theLink = '<a href="' + url + '">' + text + '</a>';
	return new hbs.SafeString(theLink);
}

helpers.ng = function(text){
	return "{{" + text + "}}"
}

helpers.getValidator = function(filename){
	return readFileSync(__dirname + '/validators/' + filename + ".js");
}

helpers.section = function(name, options){ 
	if(!this._sections) 
		this._sections = {};
	var str = options.fn(this); //no idea why this works
	this._sections[name] = str; 
    return null;
} 

module.exports = helpers;
app.service("event", function(){
	var self = this;
	var events = {};
	this.listen = function (eventName, func) {
		events[eventName] = events[eventName] || [];
		events[eventName].push(func);
	}
	this.broadcast = function (eventName) {
		if (events[eventName]) {
			var argArray = Array.prototype.slice.call(arguments, 1);
			events[eventName].forEach(function(func) {
				func.apply(null, argArray);
			});
		}
	}
	
	var handlers = {};
	this.handle = function (requestName, func) {
		handlers[requestName] = func;
	}
	this.request = function (requestName, callback) {
		var argArray = Array.prototype.slice.call(arguments, 1);
		if (handlers[requestName]){
			return handlers[requestName].apply(null, argArray);
		}
	}
	
	var handlersAsync = {};
	this.handleAsync = function (requestName, func) {
		handlersAsync[requestName] = func;
	}
	this.requestAsync = function (requestName, callback) {
		var argArray = Array.prototype.slice.call(arguments, 1);
		if (handlersAsync[requestName]){
			handlersAsync[requestName].apply(null, argArray);
		}
	}
})
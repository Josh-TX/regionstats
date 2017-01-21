app.service("typeService", function($http, event) {
	var self = this;

	this.types = [];

	function getTypes() {
		$http.post('/ajax/regionType').then(successRegionCallback, errorRegionCallback);
	}

	this.show = false;

	this.select = function(id) {
		var type = self.types.find(function(obj){
			return obj.id == id;
		})
		event.broadcast("typeSubmitted", type.id, type.name);
		self.show = false;
	}
	event.handleAsync("getTypeName", function(callback, id){
		getTypeName(callback, id);
	})
	function getTypeName(callback, id){
		if (self.types.length == 0){
			setTimeout(function(){
				getTypeName(callback, id)
			}, 200);
			return;
		}
		var type = self.types.find(function(obj){
			console.log(obj.id, id);
			return obj.id == id;
		})
		callback(type.name);
	}
	
	function successRegionCallback(response)
	{
		self.types = response.data;
	}
	function errorRegionCallback(response)
	{
		console.error(response);
	}

	getTypes();
})
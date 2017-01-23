app.service("regionService", function($http, event){
	var self = this;
	var list = {};
	var current = {};
	
	this.filter = "";
	this.show = false;
	this.regions = [];
	this.groups = [];
	this.loading = true;
	
	this.getCurrentName = function(){
		return current.name;
	}
	this.back = function() {
		var id = current.id;;
		changeRegion(list[id].parent);
	}
	this.select = function(id){
		changeRegion(id);
	}
	this.isEmpty = function(){
		return list[current.id] && list[current.id].r.length == 0;
	}
	this.isNotWorld = function(){
		return current.id != 0;
	}
	this.filterChanged = function(){
		if (list[current.id]){
			self.regions = list[current.id].r.filter(passesFilter);
		}
	}
	this.submit = function(){
		event.broadcast("regionSubmitted", current.id, current.name);
	}
	this.submitGroup = function(id){
		var group = self.groups.find(function(obj){
			return obj.id == id
		})
		self.show = false;
		event.broadcast("groupSubmitted", group.id, group.type, current.id);
	}
	event.handleAsync("getRegion", function(callback, targetid){
		if (!list[targetid]){
			$http.post('/ajax/region', {id: targetid}).then(function(response){
				list[targetid] = response.data;
				callback(response.data);
			}, errorRegionCallback);
		}
		else {
			callback(list[targetid]);
		}	
	})
	
	current.id = event.request("getInitialRegion")
	if (typeof current.id == "undefined") 
		current.id = 0;
	if (current.id == 0){
		current.name = "World";
	}
	changeRegion(current.id);
	
	function changeRegion(targetid)
	{
		var oldid = current.id
		current.id = targetid;
		self.filter = "";
		if (!list[targetid]){	
			$http.post('/ajax/region', {id: current.id}).then(successRegionCallback, errorRegionCallback);
			if (list[oldid]){
				current.name = list[oldid].r.find( function(obj){return obj.id == targetid} ).name;
			}
			self.loading = true;
			self.regions = [];
			self.groups = [];
		}
		else {
			regionChanged();
		}
	}
	function successRegionCallback(response)
	{
		list[current.id] = response.data;
		regionChanged();
	}
	function regionChanged(){
		current.name = list[current.id].name;
		self.regions = list[current.id].r;
		self.groups = list[current.id].rg;
		self.loading = false;
	}
	function errorRegionCallback(response)
	{
		console.log(response);
	}
	function passesFilter(obj){
		var filters = self.filter.toLowerCase().split(/[ ,_\-]+/);
		var tokens = obj.name.toLowerCase().split(/[ ,\-]+/);
		for (var i = 0; i < filters.length; i++) {
			var match = false;
			for (var j = 0; j < tokens.length; j++) {
				if (tokens[j].startsWith(filters[i])) {
					match = true;
					break;
				}
			}
			if (match == false) {
				return false;
			}
		}
		return true;
	}

	return self;

})
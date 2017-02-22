app.service("regionService", function($http, event){
	var activeRequests = {};
	var self = this;
	var list = {};
	var current = {};
	var types = {};
	
	this.filter = "";
	this.show = false;
	this.regions = [];
	this.groups = [];
	this.loading = true;
	
	this.getCurrentName = function(){
		return current.name;
	}
	this.getGroupStr = function(groupObj){
		
		return "Stats for each " + event.request("getTypeName", groupObj.type);
	}
	
	this.getCurrentID = function(){
		return current.id;
	}
	this.back = function() {
		var parent = list[current.id].parent;
		if (parent < 0){
			return -1;
		}
		changeRegion(parent);
		//alert("returning true")
		return parent;
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
			$http.post('/api/region', {id: targetid}).then(function(response){
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
			if (activeRequests[targetid]){
				return;
			}
			$http.post('/api/region', {id: targetid}).then(successRegionCallback, errorRegionCallback);
			if (list[oldid]){
				var child = list[oldid].r.find( function(obj){return obj.id == targetid} );
				if (child){
					current.name = child.name;
				}
				else {
					current.name = "";
				}
			}
			self.loading = true;
			activeRequests[targetid] = true;
			self.regions = [];
			self.groups = [];
		}
		else {
			regionChanged(targetid);
		}
		
		function successRegionCallback(response){
			activeRequests[targetid] = false;
			list[targetid] = response.data;
			regionChanged(targetid);
			self.loading = false;
		}
	}
	function regionChanged(targetid){
		current.name = list[targetid].name;
		self.regions = list[targetid].r;
		self.groups = list[targetid].rg;
		event.request("digestCycle");
	}
	function errorRegionCallback(response)
	{
		console.error(response);
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
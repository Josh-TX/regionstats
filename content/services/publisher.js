app.service("publisherService", function($http, event) {
	var self = this;

	this.types = [];
	this.title = "Select Publisher";
	this.newPublisher = "";

	function getPublisher() {
		$http.post('/api/publisherType').then(successRegionCallback, errorRegionCallback);
	}

	this.show = false;

	this.select = function(id) {
		var type = self.types.find(function(obj){
			return obj.id == id;
		})
		event.broadcast("publisherSubmitted", type.id, type.name);
		self.show = false;
	}

	this.addPublisher = function() {
		//console.log(self.newPublisher);
		$http.post('/api/newPublisher', {name: self.newPublisher}).then(successPublisherCallback, errorPublisherCallback);
	}

	function successPublisherCallback(response)
	{
		if (response.data.message) {
			alert(response.data.message)
		}
		else {
			getPublisher();
			self.select(response.data.insertId);
		}
	}

	function errorPublisherCallback(response)
	{
		console.error(response);
	}
	
	function successRegionCallback(response)
	{
		if (response.data.message){
			alert(response.data.message);
			self.types = [];
		} else {
			self.types = response.data;
		}
		
	}
	function errorRegionCallback(response)
	{
		console.error(response);
	}

	getPublisher();
})
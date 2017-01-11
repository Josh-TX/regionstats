function getRegionModal(form, $http)
{
	var regionModal = {};

	function getRegion(id)
	{
		if (!regionModal.list[id]){	
			$http.post('/ajax/region', {id: regionModal.currentRegion.id}).then(successRegionCallback, errorRegionCallback);
		}
		else {
			var id = regionModal.currentRegion.id;
			regionModal.currentRegion.name = regionModal.list[id].name;
			regionModal.name = regionModal.currentRegion.name;
		}
	}

	regionModal.currentRegion = {id: 0, name: "World"};
	regionModal.list = {};
	regionModal.show = false;
	regionModal.title = "Select Parent Region";
	regionModal.name = "not selected";

	regionModal.back = function() {
		var id = regionModal.currentRegion.id;
		regionModal.currentRegion.id = regionModal.list[id].parent;
		getRegion(id);
	}
	regionModal.select = function(id){
		regionModal.currentRegion.id = id;
		getRegion(id);
	}

	regionModal.submitRegion = function() {
		form.parent = regionModal.currentRegion.id;
		regionModal.name = regionModal.currentRegion.name;
	}

	function successRegionCallback(response)
	{
		console.log(response.data);
		var id = regionModal.currentRegion.id;
		regionModal.list[id] = response.data;
		regionModal.currentRegion.name = regionModal.list[id].name;
	}

	function errorRegionCallback(response)
	{
		console.log(response);
	}

	getRegion(regionModal.currentRegion.id);
	return regionModal;
}
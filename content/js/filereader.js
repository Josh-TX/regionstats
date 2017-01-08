app.directive("fileReader", function(){
	function link(scope, element, attr){
		var self = element
		element.on("change", function(e){
			var file = e.target.files[0];
			var tempName = this.value;
			var reader = new FileReader();
			reader.onload = function(e){
				scope.$apply(function(){
					scope.data = e.target.result.split("\n")
					scope.name = tempName;
				});
			}
			reader.readAsText(file);
		})
	}
	return {
		restrict: "A",
		scope: {
			data: "=fileReader",
			name: "=fileName"
		},
		link: link
	}
});
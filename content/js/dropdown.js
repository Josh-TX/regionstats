app.directive("dropdown", function(){
	function link(scope, element, attr){
		scope.show = false;
		var timeout;
		element.on("mouseleave", function(){
			out = true;
			timeout = setTimeout(function(){
				scope.$apply(function(){
					scope.show = false;
				});
			}, 500);
		});
		element.on("mouseenter", function(){
			clearTimeout(timeout);
		});
	}
	return {
		restrict: "AE",
		scope: {
			title: "=dropdown"
		},
		replace: true,
		transclude: true,
		link: link,
		templateUrl: '/content/templates/dropdown.html'
	}
});
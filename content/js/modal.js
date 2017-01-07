app.directive("modal", function(){
	function link(scope, element, attr){	
		scope.$watch('show', function(newVal, oldVal){
			if (newVal && !oldVal){
				modalOpened(scope);
			}
			if (!newVal && oldVal){
				modalClosed(scope);
			}
		})
		scope.element = element;
	}
	function modalOpened(scope){
		scope.element.css("display", "block");
		setTimeout(function(){
			scope.element.addClass("in");
		}, 20);
	}
	function modalClosed(scope){
		scope.element.removeClass("in");
		setTimeout(function(){
			scope.element.css("display", "none");
		}, 150);
	}
	return {
		restrict: "AE",
		scope: {
			title: "=str",
			show: "=modal",
			callback: "&?callback"
		},
		transclude: true,
		replace: true,
		templateUrl: "/content/templates/modal.html",
		link: link
	}
});
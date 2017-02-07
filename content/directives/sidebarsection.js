app.directive("sidebarSection", function(){
	function link(scope, element, attr){
		
		if (!scope.getName){
			scope.getName = function(arg){
				return arg.obj.name
			}
		}
	}
	return {
		restrict: "AE",
		scope: {
			title: "=sidebarSection",
			list: "=",
			getName: "&?",
			callback: "&"
		},
		replace: true,
		templateUrl: "/content/templates/sidebarsection.html",
		link: link
	}
});
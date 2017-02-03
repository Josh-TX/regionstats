app.directive("sidebarSection", function(){
	var scope;
	function link(tempScope, element, attr){	
	
	}
	return {
		restrict: "AE",
		scope: {
			title: "=sidebarSection",
			list: "=",
			callback: "&",
			empty: "="
		},
		replace: true,
		templateUrl: "/content/templates/sidebarsection.html",
		link: link
	}
});
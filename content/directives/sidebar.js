app.directive("sidebar", function(){
	var scope;
	function link(tempScope, element, attr){	
		scope = tempScope;
		scope.$watch('show', function(newVal, oldVal){
			if (newVal && !oldVal){
				modalOpened();
			}
			if (!newVal && oldVal){
				modalClosed();
			}
		})
		scope.$watch('title', resizeBody)
		scope.content = element.children().eq(0)
		scope.overlay = element.children().eq(1)
		setTimeout(resizeBody, 1000);
		window.addEventListener('resize', resizeBody);
	}
	function modalOpened(){
		scope.content.css("left", "30%")
		scope.overlay.css("display", "block");
		setTimeout(function(){
			scope.overlay.addClass("in");
		}, 50);
	}
	function modalClosed(){
		scope.content.css("left", "105%")
		scope.overlay.removeClass("in");
		setTimeout(function(){
			scope.overlay.css("display", "none");
		}, 150);
	}
	function resizeBody(){
		var header = scope.content[0].querySelector('sidebar-header');
		var height = header.clientHeight;
		var body = angular.element(scope.content[0].querySelector('sidebar-body'));
		body.css("top", height + "px");
		
	}
	return {
		restrict: "AE",
		scope: {
			show: "=sidebar",
		},
		transclude: {
			header: 'sidebarHeader',
			body: 'sidebarBody'
		},
		replace: true,
		templateUrl: "/content/templates/sidebar.html",
		link: link
	}
});
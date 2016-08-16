(function(window, undefined) {
	window._MyWebsite.autoRegister("site-subnavbar", createdCallback);

	function createdCallback(hostElement) {
		var links = hostElement.querySelectorAll("site-subnavbar-link");
		var indicator = hostElement.querySelector("site-subnavbar-link-indicator");

		var left = 0;
		for (var i = 0; i < links.length; i++) {
			var target = links[i];
			
			(function(left) {
				links[i].onmouseover = function() {
					console.log(this.offsetWidth);
				}
			})(left);
			left += links[i].offsetWidth;
		}
	}
})(window);
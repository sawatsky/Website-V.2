(function(window, undefined) {
	window._MyWebsite.autoRegister("site-subnavbar", createdCallback);

	function createdCallback(hostElement) {
		var links = hostElement.querySelectorAll("site-subnavbar-link");
		var indicator = hostElement.querySelector("site-subnavbar-link-indicator");

		var selected = hostElement.querySelector("site-subnavbar-link.selected");
		var _timeout = window.setInterval(function() {
			if (selected.offsetParent) {
				window.clearInterval(_timeout);
				moveIndicator(indicator, selected);

				selected.offsetParent.onmouseleave = function() {
					moveIndicatorHorizontal(indicator, selected);
				}
			}
		}, 100);

		for (var i = 0; i < links.length; i++) {
			links[i].onmouseover = function() {
				moveIndicatorHorizontal(indicator, this);
			}
		}
	}

	function moveIndicator(indicator, link) {
		moveIndicatorVertical(indicator, link);
		moveIndicatorHorizontal(indicator, link);
	}

	function moveIndicatorVertical(indicator, link) {
		console.log(link.offsetHeight, indicator.offsetHeight, (link.offsetHeight - indicator.offsetHeight)/2 + link.offsetTop, "asd", link.offsetTop, indicator.offsetTop);
		if (indicator.hasAttribute("top")) {
			indicator.style.top = 0 - indicator.offsetHeight + "px";
		} else if (indicator.hasAttribute("middle")) {
			
			indicator.style.top = link.offsetHeight/2 - indicator.offsetHeight/2 + link.offsetTop  + "px";
		} else {
			indicator.style.top = link.offsetHeight + "px";
		}
	}

	function moveIndicatorHorizontal(indicator, link) {
		if (indicator.hasAttribute("left")) {
			indicator.style.left = link.offsetLeft + "px";
		} else if (indicator.hasAttribute("center")) {
			indicator.style.left = link.offsetLeft + (link.offsetWidth - indicator.offsetWidth)/2 + "px";
		} else {
			indicator.style.left = link.offsetLeft + (link.offsetWidth - indicator.offsetWidth) + "px";
		}
	}
})(window);
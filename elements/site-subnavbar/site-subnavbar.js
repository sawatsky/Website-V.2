(function(window, undefined) {
	var _MyWebsite = window._MyWebsite;
	_MyWebsite.autoRegister("site-subnavbar", createdCallback);

	/**********************************************************************
		Callback called when new element of this type has been created
	**********************************************************************/
	function createdCallback(hostElement) {
		var links = hostElement.querySelectorAll("site-subnavbar-link");
		var indicator = hostElement.querySelector("site-subnavbar-link-indicator");

		if (links.length > 0 && indicator) {
			// Must provide at least one link and one indicator

			var selectedLink;
			for (var i = 0; i < links.length; i++) {
				if (links[i].classList.contains("selected")) {
					selectedLink = links[i];
				}

				// Move indicator when link is hovered over
				links[i].onmouseover = function() {
					_positionIndicatorHorizontal(indicator, this);
				}

				// Toggle selected link on click
				links[i].onclick = function() {
					if (!this.classList.contains("selected")) {
						_MyWebsite.toggleClass("selected", hostElement, this);
						selectedLink = this;
					}
				}
			}

			if (!selectedLink) {
				// If user has not chosen a selected link, default to first link
				selectedLink = links[0];
			}

			// Give element enough time to define it's properties
			var _timeout = window.setInterval(function() {
				if (selectedLink.offsetParent) {
					window.clearInterval(_timeout);

					// Set starting position of indicator
					_positionIndicator(indicator, selectedLink);

					// Reset indicator position when site-subnavbar is no longer being hovered over
					selectedLink.offsetParent.onmouseleave = function() {
						_positionIndicatorHorizontal(indicator, selectedLink);
					}
				}
			}, 50);
		} else {
			throw new Exception("Must pass at least 1 'site-subnavbar-link' and a 'site-subnavbar-link-indicator' into the 'site-subnavbar'.");
		}
	}



	/**********************************************************************
		Positions the indicator both vertically and horizontally
	**********************************************************************/
	function _positionIndicator(indicator, link) {
		_positionIndicatorVertical(indicator, link);
		_positionIndicatorHorizontal(indicator, link);
	}


	/**********************************************************************
		Positions the indicator vertically
	**********************************************************************/
	function _positionIndicatorVertical(indicator, link) {
		if (indicator.hasAttribute("top")) {
			indicator.style.top = link.offsetTop + "px";
		} else if (indicator.hasAttribute("middle")) {
			indicator.style.top = (link.offsetHeight - indicator.offsetHeight)/2 + link.offsetTop  + "px";
		} else {
			indicator.style.top = link.offsetHeight - indicator.offsetHeight + link.offsetTop - 1 + "px"; // -1 for fractional height of link.offsetParent
		}
	}


	/**********************************************************************
		Positions the indicator horizontally
	**********************************************************************/
	function _positionIndicatorHorizontal(indicator, link) {
		if (indicator.hasAttribute("left")) {
			indicator.style.left = link.offsetLeft + "px";
		} else if (indicator.hasAttribute("center")) {
			indicator.style.left = (link.offsetWidth - indicator.offsetWidth)/2 + link.offsetLeft + "px";
		} else {
			indicator.style.left = link.offsetWidth - indicator.offsetWidth + link.offsetLeft - 1 + "px"; // -1 for fractional width of link.offsetParent
		}
	}
})(window);
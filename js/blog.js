(function(document, undefined) {
	var customLink = document.querySelector("site-subnavbar-link[custom-link]");

	customLink.style.right = 0 - customLink.offsetParent.offsetLeft + 35 + "px";
})(document)
(function(window, document, undefined) {
	var i = document.currentScript.ownerDocument;
	var prototype = Object.create(HTMLElement.prototype);

	prototype.createdCallback = function() {
		this.createShadowRoot().appendChild(document.importNode(i.querySelector("#site-navbar").content, true));
	};

	document.registerElement("site-navbar", { prototype: prototype });
})(window, document);
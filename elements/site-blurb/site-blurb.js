(function(window, document, undefined) {
	var i = document.currentScript.ownerDocument;
	var prototype = Object.create(HTMLElement.prototype);

	prototype.createdCallback = function() {
		this.createShadowRoot().appendChild(document.importNode(i.querySelector("#site-blurb").content, true));
	};

	document.registerElement("site-blurb", { prototype: prototype });
})(window, document);
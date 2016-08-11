(function(window, document, undefined) {
	var _MyWebsite = {
		"autoRegister": function(importee, name) {
			return new Promise(function(success) {
				var prototype = Object.create(HTMLElement.prototype);

				prototype.createdCallback = function() {
					var root = this.createShadowRoot();
					root.appendChild(document.importNode(importee.querySelector("#"+name).content, true));
					success(root);
				}

				document.registerElement(name, { prototype: prototype });
			});
		}
	}

	window._MyWebsite = _MyWebsite;
})(window, document);
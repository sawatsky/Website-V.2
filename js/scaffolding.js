(function(window, document, undefined) {
	var _MyWebsite = {
		/**********************************************************************
			Registers a custom element

			@param name - the name of the custom element
			@param createdCallback - callback called when element has been
				created; will return that created element
		**********************************************************************/
		"autoRegister": function(name, createdCallback) {
			var importee = document.currentScript.ownerDocument;
			return new Promise(function(success) {
				var prototype = Object.create(HTMLElement.prototype);

				prototype.createdCallback = function() {
					this.createShadowRoot().appendChild(document.importNode(importee.querySelector("#"+name).content, true));
					if (createdCallback) { createdCallback(this); }
				}

				document.registerElement(name, { prototype: prototype });
			});
		},



		/**********************************************************************
			Toggles a class between children

			@param cls - the class to toggle
			@param parent - the parent whose children will have that class
				removed from them
			@param child (optional) - the child to apply the class to
		**********************************************************************/
		"toggleClass": function(cls, parent, child) {
			Array.prototype.forEach.call(parent.children, function(node) {
				node.classList.remove(cls);
			});

			if (child) {
				child.classList.add(cls);
			}
		}
	}

	window._MyWebsite = _MyWebsite;
})(window, document);
(function(window, document, undefined) {
	var _MyWebsite = {
		"autoRegister": function(importee, name) {
			return new Promise(function(success) {
				var prototype = Object.create(HTMLElement.prototype);

				prototype.createdCallback = function() {
					this.createShadowRoot().appendChild(document.importNode(importee.querySelector("#"+name).content, true));
					success(this);
				}

				document.registerElement(name, { prototype: prototype });
			});
		},

		"toggleClass": function(cls, parent, node) {
			Array.prototype.forEach.call(parent.children, function(node) {
				node.classList.remove(cls);
			});

			if (node) {
				node.classList.add(cls);
			}
		}
	}

	window._MyWebsite = _MyWebsite;
})(window, document);
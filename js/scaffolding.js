(function(window, document, undefined) {
	var _MyWebsite = {
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


	if (!Object.prototype.watch) {
		Object.defineProperty(Object.prototype, "watch", {
			"enumerable": false,
			"configurable": false,
			"writable": false,
			"value": function(prop, handler) {
				var oldVal = this[prop],
					newVal = oldVal,
					getter = function() {
						return newVal;
					},
					setter = function(val) {
						oldVal = newVal;
						return newVal = handler.call(this, prop, oldVal, val);
					};

				if (delete this[prop]) {
					Object.defineProperty(this, prop, {
						"enumerable": true,
						"configurable": true,
						"get": getter,
						"set": setter
					});
				}
			}
		});
	}

	if (!Object.prototype.unwatch) {
		Object.defineProperty(Object.prototype, "unwatch", {
			"enumerable": false,
			"configurable": true,
			"writable": false,
			"value": function(prop) {
				var val = this[prop];
				delete this[prop];
				this[prop] = val;
			}
		});
	}
})(window, document);
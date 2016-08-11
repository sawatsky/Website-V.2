(function(window, document, undefined) {
	var _contactForm = document.querySelector("body-content contact-form");

	_contactForm.querySelectorAll("input, div[contenteditable]").forEach(function(node) {
		node.oninput = function() {
			console.log(this, this.parentNode);
			if (!this.value && !this.innerHTML) {
				this.parentNode.classList.remove("focused");
			} else {
				console.log("here")
				this.parentNode.classList.add("focused");
			}
		}
	});

	function _toggleClass(parent, node, cls) {
		Array.prototype.forEach.call(parent.children, function(node) {
			node.classList.remove(cls);
		});

		if (node) {
			node.classList.add(cls);
		}
	}
})(window, document);
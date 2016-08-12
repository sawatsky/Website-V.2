(function(window, document, undefined) {
	window._MyWebsite.autoRegister("site-input", createdCallback);

	// Function called when element successfully created
	function createdCallback(hostElement) {
		var input = hostElement.shadowRoot.querySelector("div[contenteditable]");
		var title = hostElement.shadowRoot.querySelector("site-input-title");
		var error = hostElement.shadowRoot.querySelector(".error");
		var _old = "";
		var _timeout;

		// Do something better...
		if (hostElement.hasAttribute("multi-line")) {
			input.setAttribute("multi-line", "");
		} else {
			input.setAttribute("single-line", "");
		}

		// The div's content has changed
		input.oninput = function() {
			if (!this.textContent) {
				// The content is empty (user erased everything)

				title.classList.remove("expanded");
				_old = this.textContent;
			} else {
				// There's content
				if (!_old) {
					// But the content used to be empty, so move the placeholder

					title.classList.add("expanded");
				}

				// Check if content to long
				if (checkInput(this)) {
					// Content is under acceptable length

					_old = this.textContent;
				} else {
					// Content is too long

					this.textContent = _old;
					if (_old) {
						moveCaretToEnd(this);
					} else {
						// User attempted to paste in content that was too long

						title.classList.remove("expanded");
					}

					//Toggle show/hide of error message for content being too long
					if (_timeout) {
						window.clearTimeout(_timeout);
					} else {
						error.classList.add("show");
					}
					
					_timeout = window.setTimeout(function() {
						error.classList.remove("show");
						_timeout = null;
					}, 1500);
				}
			}
		}

		// User clicked on input to focus it
		input.onfocus = function() {
			if (this.textContent) {
				// If there is content, scroll to the end of it

				// Fix Chrome glitch
				input.onmouseup = function() {
					input.onmouseup = null;
					moveCaretToEnd(this);
					this.scrollLeft = this.offsetWidth;
					return false;
				}
			}
		}
		
		// User clicked away from input, bluring it
		input.onblur = function() {
			// Scroll back to the beginning of input

			this.scrollLeft = 0;
		}
	}

	// Check that input content is within acceptable range
	function checkInput(input) {
		if (input.hasAttribute("single-line")) {
			return input.textContent.length <= 256;
		} else {
			return input.textContent.length <= 1024;
		}
	}

	// Move the cursor to the end of the content
	function moveCaretToEnd(input) {
		var end = input.textContent.length;
		if (document.selection) {
			var range = document.selection.createRange();
			range.moveStart('character', end);
			range.select();
		}
		else {
			window.getSelection().collapse(input.firstChild, end);
		}
	}
})(window, document);
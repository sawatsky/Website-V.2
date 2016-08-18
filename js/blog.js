(function(document, undefined) {
	var links = document.querySelectorAll("site-subnavbar-link");
	links.forEach(function(link) {
		if (link.hasAttribute("custom-link")) {
			link.style.right = 0 - link.offsetParent.offsetLeft + 35 + "px";
		}

		link.onclick = function() {
			var xmlHttpRequest = new XMLHttpRequest();
			xmlHttpRequest.onreadystatechange = function() {
				if (xmlHttpRequest.readyState === 4 && (xmlHttpRequest.status === 200 || xmlHttpRequest.status == 0)) {
					console.log(JSON.parse(xmlHttpRequest.responseText));
					// if user clicked random link, randomly select one of the blogs from the response text to display
					// Otherwise, display list of all blogs from response text
				}
			}
			xmlHttpRequest.open("GET", "blogs/" + (link.hasAttribute("src") ? link.getAttribute("src") : links[Math.floor(Math.random() * links.length)]).getAttribute("src"), true);
			xmlHttpRequest.send();
		}
	});
})(document)
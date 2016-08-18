(function(document, undefined) {
	var customLink = document.querySelector("site-subnavbar-link[custom-link]");

	customLink.style.right = 0 - customLink.offsetParent.offsetLeft + 35 + "px";

	var xmlHttpRequest = new XMLHttpRequest();
	xmlHttpRequest.onreadystatechange = function() {
		if (xmlHttpRequest.readyState === 4 && (xmlHttpRequest.status === 200 || xmlHttpRequest.status == 0)) {
			console.log(JSON.parse(xmlHttpRequest.responseText));
		}
	}
	xmlHttpRequest.open("GET", "blogs/jquery.json", true);
	xmlHttpRequest.send();
})(document)
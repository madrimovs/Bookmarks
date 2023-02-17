let darkMode = localStorage.getItem("darkMode");

if (darkMode == "true") {
	addDarkMode();
}
document.querySelector(".switch").addEventListener("click", function () {
	darkMode = localStorage.getItem("darkMode");
	if (darkMode == "true") {
		removeDarkMode();
	} else {
		addDarkMode();
	}
});

function addDarkMode() {
	darkMode = localStorage.setItem("darkMode", "true");
	document.getElementsByTagName("body")[0].classList.add("darkMode");
}

function removeDarkMode() {
	darkMode = localStorage.setItem("darkMode", "false");
	document.getElementsByTagName("body")[0].classList.remove("darkMode");
}

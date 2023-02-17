"use strict";

import findElement from "./helpers/findElement.js";
import { generateError } from "./helpers/render.js";

const elForm = findElement(".form");
const elUsernameInput = findElement(".username-input");
const elPasswordInput = findElement(".password-input");
const errorEmail = findElement(".errorEmail");
const errorPass = findElement(".errorPass");
const forgotLink = findElement(".forgot");
const forgotEmail = findElement(".forgotEmail");

elForm.addEventListener("submit", function (evt) {
	evt.preventDefault();

	if (elUsernameInput.value.length === 0) {
		generateError(errorEmail, "Iltimos quyidagi e-mailni kiriting: eve.holt@reqres.in");
	}

	if (elPasswordInput.value.length < 6) {
		generateError(errorPass, "Parol 6 ta belgidan kam bo'lmasligi kerak");
	}

	const usernameValue = elUsernameInput.value;
	const passwordValue = elPasswordInput.value;

	fetch("https://reqres.in/api/login", {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({
			email: usernameValue,
			password: passwordValue,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.token) {
				window.localStorage.setItem("token", data.token);

				window.location.href = "index.html";
			}
		});
});

forgotLink.addEventListener("click", () => {
	forgotEmail.textContent = "eve.holt@reqres.in";
	forgotEmail.style.display = "block";

	const time = setTimeout(() => {
		forgotEmail.style.display = "none";

		clearTimeout(time);
	}, 3000);
});

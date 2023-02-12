import { displayMessage } from "./components/renders/displayMessage.js";
import { baseUrl } from "./settings/api.js";
import { saveToken, saveUser } from "./settings/storage.js";
import createMenu from "./components/renders/createMenu.js";

createMenu();

const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if (usernameValue.length === 0 || passwordValue.length === 0) {
        return displayMessage("warning", "Invalid values, <br/> please check your credentials", ".message-container");
    }

    doLogin(usernameValue, passwordValue);
}

async function doLogin(username, password) {
    const url = baseUrl + "/auth/local";

    const data = JSON.stringify({ identifier: username, password: password });

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);

        if (json.user) {
            location.href = "/";

            saveToken(json.jwt);
            saveUser(json.user);
        }

        if (json.error) {
            displayMessage("danger text-light", "Invalid username or password", ".message-container");
        }
    } catch (error) {
        console.log(error);
    }
}

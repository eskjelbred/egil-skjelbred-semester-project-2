import { baseUrl } from "../settings/api.js";
import { displayMessage } from "../components/renders/displayMessage.js";
import { getToken } from "../settings/storage.js";
import { renderDataInput } from "../components/renders/renderData.js";

const form = document.querySelector("form");
const message = document.querySelector(".message-container");
const idInput = document.querySelector("#id");

renderDataInput();

export function submitEditForm() {
    form.addEventListener("submit", submitForm);

    function submitForm(event) {
        event.preventDefault();

        message.innerHTML = "";

        const titleValue = title.value.trim();
        const priceValue = parseFloat(price.value);
        const descriptionValue = description.value.trim();
        const featureValue = productFeature.checked;
        const imageValue = image.files[0];
        const idValue = idInput.value;

        if (titleValue.length === 0 || priceValue === 0 || descriptionValue === 0) {
            return displayMessage("warning", "Please supply proper values", ".message-container");
        }

        updateProduct(titleValue, priceValue, descriptionValue, imageValue, featureValue, idValue);
    }
}

async function updateProduct(title, price, description, image, feature, id) {
    const url = baseUrl + "/products/" + id;
    const formData = new FormData();

    if (image) {
        formData.append("files.image", image, image.name);
    }

    const data = JSON.stringify({ title: title, price: price, description: description, featured: feature });
    formData.append("data", data);
    const token = getToken();

    const putOptions = {
        method: "PUT",
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, putOptions);
        const json = await response.json();

        if (json.updated_at) {
            displayMessage("success text-light text-center", "Product updated", ".message-container");
        }
        if (json.error) {
            displayMessage("danger", json.message, ".message-container");
        }
    } catch (error) {
        console.log(error);
    }
}

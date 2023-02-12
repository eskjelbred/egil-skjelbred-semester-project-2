import { baseUrl } from "../settings/api.js";
import { getToken } from "../settings/storage.js";
import { displayMessage } from "../components/renders/displayMessage.js";

const form = document.querySelector("form");
const message = document.querySelector(".message-container");

export function submitAddForm() {
    form.addEventListener("submit", submitForm);

    function submitForm(event) {
        event.preventDefault();

        message.innerHTML = "";

        const titleValue = title.value.trim();
        const priceValue = parseFloat(price.value);
        const descriptionValue = description.value.trim();
        const featureValue = productFeature.checked;
        const imageValue = image.files[0];

        if (titleValue.length === 0 || priceValue === 0 || descriptionValue === 0) {
            return displayMessage("warning", "Please supply proper values", ".message-container");
        }

        addProduct(titleValue, priceValue, descriptionValue, featureValue, imageValue);
    }

    async function addProduct(title, price, description, feature, image) {
        const url = baseUrl + "/products";

        const formData = new FormData();
        formData.append("files.image", image, image.name);

        const data = JSON.stringify({ title: title, price: price, description: description, featured: feature });
        formData.set("data", data);
        const token = getToken();

        const options = {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await fetch(url, options);
            const json = await response.json();

            if (json.created_at) {
                displayMessage("success text-light text-center", "Product added", ".message-container");
            }
            if (json.error) {
                displayMessage("danger", json.message, ".message-container");
            }
        } catch (error) {
            console.log(error);
        }
    }
}

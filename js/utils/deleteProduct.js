import { baseUrl } from "../settings/api.js";
import { getToken } from "../settings/storage.js";

export function deleteItem() {
    const removeBtn = document.querySelector(".removeBtn");

    removeBtn.onclick = async function () {
        const queryString = document.location.search;
        const params = new URLSearchParams(queryString);
        const paramId = params.get("id");

        console.log(paramId);

        const confirmDelete = confirm("Are you sure you want to delete this item? </br> This action can not be reversed.");

        if (confirmDelete) {
            const url = baseUrl + "/products/" + paramId;
            const token = getToken();

            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const response = await fetch(url, options);
                const json = await response.json();

                location.href = "/";
            } catch (error) {
                console.log(error);
            }
        }
    };
}

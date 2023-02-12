import { baseUrl } from "../settings/api.js";
import { renderData } from "./renders/renderData.js";
import { filterData } from "../utils/productFilter.js";

export function getFilteredData() {
    const productsUrl = baseUrl + "/products";

    (async function () {
        const container = document.querySelector(".product-container");

        try {
            const response = await fetch(productsUrl);
            const json = await response.json();

            container.innerHTML = "";

            const products = json.filter(filterData);

            renderData(products);
            filterData(products);
        } catch (error) {
            console.log(error);
        }
    })();
}

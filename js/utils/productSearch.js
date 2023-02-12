import { renderData } from "../components/renders/renderData.js";

export function searchData(products) {
    const search = document.querySelector("form input");

    search.onkeyup = function (event) {
        const searchValue = event.target.value.trim().toLowerCase();
        const filteredProducts = products.filter(function (product) {
            if (product.title.toLowerCase().includes(searchValue) || product.description.toLowerCase().includes(searchValue)) {
                return true;
            }
        });

        renderData(filteredProducts);
    };
}

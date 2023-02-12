import { baseUrl } from "../../settings/api.js";
import { getUsername } from "../../settings/storage.js";
import { addToCart } from "../../utils/addToCart.js";

export function renderData(dataToRender) {
    const container = document.querySelector(".product-container");

    const username = getUsername();

    container.innerHTML = "";

    dataToRender.forEach(function (product) {
        let editBtn = `<a href="edit.html?id=${product.id}"><i class="fas fa-tools text-secondary"></i></a>`;

        if (!username) {
            editBtn = "";
        }

        container.innerHTML += `
            <div class="product card col-5 col-md-2 mx-auto my-2 p-0">
                <a href="products.html?id=${product.id}&${product.title}" class="text-decoration-none text-dark flex-fill">
                    <img src="${baseUrl}${product.image.url}" alt="Picture of ${product.title}" class="card-img-top">
                </a>
                    <div>
                        <a href="products.html?id=${product.id}&${product.title}" class="text-decoration-none text-dark flex-fill">
                            <span class="fw-bold">${product.title}</span>
                            <span class="d-block" id="price">${product.price},-</span>
                        </a>
                    </div>
                    <span class="position-absolute top-0 start-100 translate-middle">${editBtn}</span>
                <i class="btn btn-success addToCart m-2" data-id="${product.id}" data-name="${product.title}" data-price="${product.price}" data-image="${product.image.url}">+ Add to cart</i>
            </div>`;
    });

    addToCart();
}

export function renderDataInput() {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const paramId = params.get("id");

    if (!id) {
        document.location.href = "/";
    }

    const productUrl = baseUrl + "/products/" + paramId;

    const productContainer = document.querySelector(".product-container");
    const loadingContainer = document.querySelector(".spinner-border");
    const title = document.querySelector("#title");
    const price = document.querySelector("#price");
    const description = document.querySelector("#description");
    const previewImg = document.querySelector("#prewImg");
    const featured = document.querySelector("#productFeature");
    const idInput = document.querySelector("#id");

    (async function () {
        try {
            const response = await fetch(productUrl);
            const details = await response.json();

            title.value = details.title;
            price.value = details.price;
            description.value = details.description;
            featured.value = details.feature;
            idInput.value = details.id;

            if (details.featured === true) {
                featured.checked = true;
            } else {
                featured.checked = false;
            }

            previewImg.src = baseUrl + details.image.url;
        } catch (error) {
            console.log(error);
        } finally {
            loadingContainer.style.display = "none";
            productContainer.style.display = "block";
        }
    })();
}

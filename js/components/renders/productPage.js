import { baseUrl } from "../../settings/api.js";
import createMenu from "./createMenu.js";
import { displayItemsInCart } from "./displayCart.js";
import { addToCart } from "../../utils/addToCart.js";

createMenu();

const productContainer = document.querySelector(".product-container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const paramId = params.get("id");
const productId = baseUrl + "/products/" + paramId;

async function getProduct() {
    try {
        const response = await fetch(productId);
        const product = await response.json();

        createHTML(product);
    } catch (error) {
        console.log(error);
    }
}

getProduct();

function createHTML(product) {
    productContainer.innerHTML = `
    <div class="row flex-lg-row align-items-center g-5 py-5">
        <div class="col-10 col-sm-8 col-lg-6">
            <img src="${baseUrl}${product.image.url}" class="d-block mx-lg-auto img-fluid" alt="Picture of ${product.title}" width="700" height="500" loading="lazy">
        </div>
        <div class="col-lg-6">
            <h1 class="display-5 fw-bold lh-1 mb-3">${product.title}</h1>
            <p class="lead">${product.description}</p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                <span class="btn btn-success btn-lg px-4 me-md-2 addToCart" data-id="${product.id}" data-name="${product.title}"><i class="fas fa-cart-plus pe-3"></i>Add to cart</span>
            </div>
        </div>
    </div>
    `;

    addToCart();
}

displayItemsInCart();

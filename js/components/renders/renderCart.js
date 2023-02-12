import { baseUrl } from "../../settings/api.js";
import { getExistingCart, removeCart } from "../../settings/storage.js";

export function renderCart() {
    const shoppingCart = getExistingCart();
    const cartContainer = document.querySelector(".product-container");
    const cartSummary = document.querySelector(".product-container__summary");

    cartContainer.innerHTML = "";

    if (shoppingCart.length === 0) {
        cartContainer.innerHTML = `<p>No items in cart</p>`;
    }

    shoppingCart.forEach((product) => {
        cartContainer.innerHTML += `
        <div class="d-sm-flex justify-content-between align-items-center my-2 pb-3 border-bottom">
            <div class="d-block d-sm-flex align-items-center text-center text-sm-start product-incart">
                <a href="/products.html?id=${product.id}&${product.title}" class="d-inline-block flex-shrink-0 mx-auto me-sm-4">
                    <img src="${baseUrl}${product.image}" alt="Picture of ${product.title}" width="120">
                </a>
                <div>
                    <h3 class="fs-2 mb-2">${product.name}</h3>
                    </div>
                    </div>
                    <div class="pt-2 pt-sm-0 ps-sm-3 mx-auto mx-sm-0 text-center text-sm-start">
                    <div>
                        <span class="fs-3 pt-2">${product.price},-</span>
                    </div>
                <span class="remove-item text-secondary text-decoration-underline" data-id="${product.id}">Remove item</span>
            </div>
        </div>
        `;

        const removeBtn = document.querySelectorAll(".remove-item");
        removeBtn.forEach((button) => {
            button.addEventListener("click", removeCart);
        });
    });

    // Push product.price into an array and display sum of product.price's if there is items in array (productPrices). If array is empty, do not show anything
    let i = 0;
    const reducer = (productPrices, currentSum) => productPrices + currentSum;
    let productPrices = [];
    for (let i = 0; i < shoppingCart.length; i++) {
        productPrices.push(parseFloat(shoppingCart[i].price));
    }

    if (productPrices.length === 0) {
        cartSummary.innerHTML = "";
    } else {
        cartSummary.innerHTML = `Total: ` + productPrices.reduce(reducer).toFixed(2) + `,-`;
    }
}

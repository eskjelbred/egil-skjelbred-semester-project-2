export function displayItemsInCart() {
    const itemsInCart = localStorage.getItem("shoppingcart");
    const badgeCart = document.querySelector(".itemInCart");

    if (itemsInCart !== null) {
        badgeCart.innerHTML = JSON.parse(itemsInCart).length;
    }
};



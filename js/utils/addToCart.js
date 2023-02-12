import { getExistingCart, saveCart } from "../settings/storage.js";
import { displayItemsInCart } from "../components/renders/displayCart.js";

export function addToCart() {
    const cartButtons = document.querySelectorAll(".addToCart");

    cartButtons.forEach((cart) => {
        cart.addEventListener("click", handleClick);
    });

    function handleClick() {
        const id = this.dataset.id;
        const name = this.dataset.name;
        const price = this.dataset.price;
        const image = this.dataset.image;
        const currentCart = getExistingCart();

        const productExists = currentCart.find((cart) => cart.id === id);

        if (!productExists) {
            const product = { id: id, name: name, price: price, image: image };
            currentCart.push(product);
            saveCart(currentCart);
        } else {
            const newCart = currentCart.filter((cart) => cart.id !== id);
            saveCart(newCart);
        }

        displayItemsInCart();
    }
    displayItemsInCart();
}

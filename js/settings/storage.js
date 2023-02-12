import { renderCart } from "../components/renders/renderCart.js";
import { displayItemsInCart } from "../components/renders/displayCart.js";

const tokenKey = "token";
const userKey = "user";

// Save token and user to localstorage when logged in
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Get key from localstorage
function getFromStorage(key) {
    const value = localStorage.getItem(key);

    if (!value) {
        return [];
    }
    return JSON.parse(value);
}

// Save token to localstorage
export function saveToken(token) {
    saveToStorage(tokenKey, token);
}

// Get token from localstorage
export function getToken() {
    return getFromStorage(tokenKey);
}

// Save user to localstorage
export function saveUser(user) {
    saveToStorage(userKey, user);
}

// get username from localstorage
export function getUsername() {
    const user = getFromStorage(userKey);

    if (user) {
        return user.username;
    }
    return null;
}

// Remove token and user from localstorage if confirmed
export function removeFromStorage() {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
}

// Check if there is any products in shoppingcart (localstorage), if it is, parse product
export function getExistingCart() {
    const itemsInCart = localStorage.getItem("shoppingcart");

    if (itemsInCart === null) {
        return [];
    } else {
        return JSON.parse(itemsInCart);
    }
}

// Save item to shoppingcart (localstorage)
export function saveCart(itemsInCart) {
    localStorage.setItem("shoppingcart", JSON.stringify(itemsInCart));
}

export function removeCart() {
    const confirmRemove = confirm("Are you sure you want to remove this item?");
    if (confirmRemove) {
        const id = event.target.parentElement.dataset.id;
        const currentCart = getExistingCart();
        const productExists = currentCart.find(function (cartItem) {
            return cartItem.id === id;
        });

        if (productExists) {
            const newCart = currentCart.filter((cartItem) => cartItem.id !== id);

            saveCart(newCart);
        }
        renderCart();
    }
    displayItemsInCart();
}

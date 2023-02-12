import { getUsername } from "../../settings/storage.js";
import { loggedIn } from "../../utils/logout.js";

export default function createMenu() {
    const container = document.querySelector("header");
    const { pathname } = document.location;
    const username = getUsername();

    let authLink = `<a href="login.html" class="${pathname === "/login.html" ? "active" : ""} nav-link">Login</a>`;

    if (username) {
        authLink = `
        <a href="add.html" class="${pathname === "/add.html" ? "active" : ""} nav-link">Add product</a>
        `;
    }

    container.innerHTML = `
    
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
            <span class="fs-4">The Shoe Shop</span>
        </a>
        <ul class="nav">
            <li class="nav-item">
                <a href="shop.html" class="${pathname === "/shop.html" ? "active" : ""} nav-link">Shop</a>
            </li>
            <li class="nav-item">
                ${authLink}
            </li>
            <li class="nav-item">
                <a href="cart.html" class="${pathname === "/cart.html" ? "active" : ""} nav-link">Cart</a>
            </li>
            <li class="nav-item d-none" id="logoutBtn">
                <a href="/" class="nav-link">Logout</a>
            </li>
            <li class="nav-item">
                <a href="cart.html" class="nav-link">
                    <i class="fas fa-shopping-cart fs-3 text-success position-relative">
                        <span class="itemInCart position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger" style="font-size: .75rem;">0</span>
                    </i>
                </a>
            </li>
        </ul>
    `;

    loggedIn();
}

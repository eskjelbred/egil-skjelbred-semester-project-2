import { baseUrl } from "../../settings/api.js";

export function getHeroImage() {
    const uploadsUrl = baseUrl + "/home/";
    const heroSection = document.querySelector(".heroImg");

    (async function () {
        try {
            const response = await fetch(uploadsUrl);
            const products = await response.json();

            heroSection.innerHTML = `<img class="heroImg rounded-lg-3" src="${baseUrl}${products.hero_banner.url}" alt="" width="720" />`;
        } catch (error) {
            console.log(error);
        }
    })();
}

import { getFilteredData } from "./components/getFilteredProducts.js";
import createMenu from "./components/renders/createMenu.js";
import { getHeroImage } from "./components/renders/renderIndex.js";

createMenu();

getFilteredData();

getHeroImage();

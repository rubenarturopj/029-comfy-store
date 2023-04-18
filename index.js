// global imports
import "./src/toggleSidebar.js";
import "./src/cart/toggleCart.js";
import "./src/cart/setupCart.js";
// specific imports
import fetchProducts from "./src/fetchProducts.js";
import { setupStore, store } from "./src/store.js";
import display from "./src/displayProducts.js";
import { getElement } from "./src/utils.js";

const init = async () => {
    const products = await fetchProducts();
    if (products) {
        // add products to the store
        setupStore(products);

        // to grab all the items that have the property "featured" as true;
        const featured = store.filter((product) => product.featured === true);
        display(featured, getElement(".featured-center"));
    }
};

// add event listener to the moment to all the elements of the DOM load
window.addEventListener("DOMContentLoaded", init);

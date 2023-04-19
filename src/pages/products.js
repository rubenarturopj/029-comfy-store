// global imports
import "../toggleSidebar.js";
import "../cart/toggleCart.js";
import "../cart/setupCart.js";

//  filter imports
import setupSearch from "../filters/search.js";
import setupCompanies from "../filters/companies.js";
import setupPrice from "../filters/price.js";

// specific imports
import { store, setupStore } from "../store.js";
import display from "../displayProducts.js";
import { getElement } from "../utils.js";

// implementation of conditional fetch. In case the user didn't go to the homepage
// but to the producs page directly. Because we haven't set the "store" in localstorage,
// there's nothing to display

// import fetch product
import fetchProducts from "../fetchProducts.js";

const init = async () => {
    const loading = getElement(".page-loading");

    // conditional fetch
    if (store.length < 1) {
        const products = await fetchProducts();
        setupStore(products);
    }

    display(store, getElement(".products-container"));

    setupSearch(store);
    setupCompanies(store);
    setupPrice(store);

    loading.style.display = "none";
};

init();

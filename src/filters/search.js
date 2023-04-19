import { getElement } from "../utils.js";
import display from "../displayProducts.js";
const setupSearch = (store) => {
    const form = getElement(".input-form");
    const nameInput = getElement(".search-input");

    form.addEventListener("keyup", function () {
        const value = nameInput.value;

        if (value) {
            // if value is not undefined, then display the filtered products
            const newStore = store.filter((product) => {
                let { name } = product;
                name = name.toLowerCase();
                if (name.startsWith(value)) {
                    return product;
                }
            });

            display(newStore, getElement(".products-container"), true); // "true" value will be used in displayProducts.js as a paremeter to return from the function and avoid duplication of items

            if (newStore.length < 1) {
                const products = getElement(".products-container");
                products.innerHTML = `<h3 class="filter-error">Sorry, no products matched your search</h3>`;
            }
        } else {
            // if value is undefined, then display all products
            display(store, getElement(".products-container"), true);
        }
    });
};

export default setupSearch;

import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const setupPrice = (store) => {
    const priceInput = getElement(".price-filter"); // grabbing it from products.html
    // this input comes from the form and it has properties of   vale, max, min.
    const priceValue = getElement(".price-value"); // this paragraph is after the form

    // setup filter  *** creating an array with all the prices
    let maxPrice = store.map((product) => {
        return product.price;
    });

    maxPrice = Math.max(...maxPrice); // get the higest price
    maxPrice = Math.ceil(maxPrice / 100); // round it to the higher whole number/integer
    // console.log(maxPrice);
    priceInput.value = maxPrice;
    priceInput.max = maxPrice;
    priceInput.min = 0;
    priceValue.textContent = `Value: $${maxPrice}`;

    // the input event fires when the value of an <input>, <select> or <textarea> changes.
    priceInput.addEventListener("input", function () {
        const value = parseInt(priceInput.value); // value is a string, that's why we need to Parse Integer
        // console.log("type: " + typeof value + ", value: " + value);
        priceValue.textContent = `Value: $${value}`;

        // filtering the elements with the price indicated
        let newStore = store.filter((product) => {
            return product.price <= value * 100;
        });
        // displaying these products that have the price desired
        if (newStore.length < 1) {
            const products = getElement(".products-container");
            products.innerHTML = `<h3 class="filter-error">Sorry, no products matched your search</h3>`;
        } else {
            display(newStore, getElement(".products-container"), true);
        }
    });
};

export default setupPrice;

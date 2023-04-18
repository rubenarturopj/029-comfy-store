// global imports
import "../toggleSidebar.js";
import "../cart/toggleCart.js";
import "../cart/setupCart.js";
// specific
import { addToCart } from "../cart/setupCart.js";
import { singleProductUrl, getElement, formatPrice } from "../utils.js";

// selections
const loading = getElement(".page-loading");
const centerDOM = getElement(".single-product-center");
const pageTitleDOM = getElement(".page-hero-title");
const imgDOM = getElement(".single-product-img");
const titleDOM = getElement(".single-product-title");
const companyDOM = getElement(".single-product-company");
const priceDOM = getElement(".single-product-price");
const colorsDOM = getElement(".single-product-colors");
const descDOM = getElement(".single-product-desc");
const cartBtn = getElement(".addToCartBtn");

// cart product
let productID;

// when the page loads
window.addEventListener("DOMContentLoaded", async function () {
    // to get the id from the URL
    const urlID = window.location.search;

    // start of    fetch single product   *********************
    try {
        const response = await fetch(`${singleProductUrl}${urlID}`);

        // if error while fetching, not only error of network, but error of bad url-id.
        // successful fetch is always in the 200-299 range
        if (response.status >= 200 && response.status <= 299) {
            const data = await response.json();
            // console.log(data);

            // grab data
            const { id, fields } = data;
            const { name, company, price, colors, description } = fields;
            const image = fields.image[0].thumbnails.large.url;

            // set values
            productID = id; // for the cart
            document.title = `${name.toUpperCase()} | Comfy`; // the title of the tab
            pageTitleDOM.textContent = `Home / ${name}`; // the title of the page, showing the path
            imgDOM.src = `${image}`; // the picture of the single product
            titleDOM.textContent = `${name}`; // the title of the single product
            companyDOM.textContent = `by ${company}`; // the company of the single product
            priceDOM.textContent = formatPrice(price); // the price of the single product
            descDOM.textContent = `${description}`; // the description of the single product
            colors.forEach((color) => {
                const span = document.createElement("span");
                span.classList.add("product-color");
                span.style.backgroundColor = `${color}`;
                colorsDOM.appendChild(span);
            }); // for the colors

            // Alternative for colorsssss*****************
            //const colorz = colors
            //    .map((eachColor) => {
            //        return `<span class="product-color" style="background: ${eachColor}"></span>`;
            //    })
            //    .join("");
            //colorsDOM.innerHTML = `${colorz}`; // the colors of the single product
        } else {
            console.log(response.status, response.statusText);
            centerDOM.innerHTML = `
                <div>
                <h3 class="error">Sorry, something went wrong</h3>
                <a href="index.html" class="btn" >back to home</a>
                </div>
            `;
            throw new Error("Error while fetching. Fetch not fulfilled");
        }
    } catch (error) {
        console.log(error);
    }
    // end of    fetch single product    ************

    // show product and hide loading temp page
    loading.style.display = "none";
});

cartBtn.addEventListener("click", function () {
    addToCart(productID);
}); //  the cart btn

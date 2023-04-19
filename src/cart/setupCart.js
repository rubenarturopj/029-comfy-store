// import
import {
    getStorageItem,
    setStorageItem,
    formatPrice,
    getElement,
} from "../utils.js";
import { openCart } from "./toggleCart.js";
import { findProduct } from "../store.js";
import addToCartDOM from "./addToCartDOM.js";

// set items
const cartItemCountDOM = getElement(".cart-item-count");
const cartItemsDOM = getElement(".cart-items");
const cartTotalDOM = getElement(".cart-total");

let cart = getStorageItem("cart"); // this will retrieve the items stored in the cart

export const addToCart = (id) => {
    console.log("id: " + id);
    // this variable will carry the product(all its info) that has this ID
    let item = cart.find((cartItem) => {
        return cartItem.id === id;
    });
    if (!item) {
        // if item is undefined it means the item is not in the cart
        console.log("item is not in the cart");

        // because it's not already in the cart, we need to search for it
        let product = findProduct(id); // to search the item in the full list of items from the API

        // now that we found it, let's add the item to the cart
        product = { ...product, amount: 1 }; // first we add the quantity to the desired object
        // console.log(product);
        cart = [...cart, product]; // now we add the item and its quantity to the cart
        console.log(
            "item was succesfully added to the cart. These are al the items in the cart:"
        );
        console.log(cart); // to check the all the items in the cart

        // now we add that new item to the DOM (to the user interface)
        addToCartDOM(product);
    } else {
        console.log("item is in the cart");
        console.log(item);
        // update values
    }
    // get the total amount of item -- this will be displayed in the icon of the cart
    displayCartItemsCount();

    // get the total to pay after adding up all items $$$$$ display on the cart sidebar
    displayCartTotal();

    // set cart in local storage -- to register our selection
    setStorageItem("cart", cart);

    //more stuff coming up
    openCart();
};

function displayCartItemsCount() {
    // cart is coming from localstorage
    const amount = cart.reduce((total, cartItem) => {
        return (total += cartItem.amount);
    }, 0);
    cartItemCountDOM.textContent = amount;
}

function displayCartTotal() {
    // cart is coming from localstorage
    let total = cart.reduce((total, cartItem) => {
        return (total += cartItem.price * cartItem.amount);
    }, 0);
    cartTotalDOM.textContent = `Total: ${formatPrice(total)}`;
}

function displayCartItemsDOM() {
    cart.forEach((cartItem) => {
        addToCartDOM(cartItem);
    });
}

function setupCartFunctionality() {
    //
}

// function that fires when we open / load the page, to retrieve the items already in the cart
const init = () => {
    console.log("checking what's in the cart");
    console.log(cart);
    console.log("--- end of the cart ---");
    // display amount of cart items in the cart ICON (retrieved from storage)
    displayCartItemsCount();
    // display total $$$ of items that are in the cart (retrieved from storage)
    displayCartTotal();
    // display all items that are in the cart (retrieved from storage)
    displayCartItemsDOM();
    // setup cart functionality (buttons)
    setupCartFunctionality();
};
init();

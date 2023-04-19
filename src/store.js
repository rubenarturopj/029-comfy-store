import { getStorageItem, setStorageItem } from "./utils.js";

let store = getStorageItem("store"); // it will start at empty array, but once the fetch happens
// it will have the items fetched ready to be displayed

const setupStore = (products) => {
    store = products.map((product) => {
        const { id, fields:{featured, name, price, company, colors, image:img}} = product; // prettier-ignore
        const image = img[0].thumbnails.large.url;
        // const {featured, name, price, company, colors} = item.fields; // option 2
        // const {image} = item.fields.image[0].thumbnails.large.url; // option 2
        return { id, featured, name, price, company, colors, image };
    });
    setStorageItem("store", store);
};

// to search the specific item that has this ID in the full list of items
const findProduct = (id) => {
    let product = store.find((product) => {
        return product.id === id;
    });

    return product;
};

export { store, setupStore, findProduct };

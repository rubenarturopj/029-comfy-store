import { allProductsUrl } from "./utils.js";

const fetchProducts = async () => {
    try {
        const response = await fetch(allProductsUrl);

        // if there was no error while fetching
        if (response) {
            return response.json();
        }
        // otherwise...
        return response;
    } catch (error) {
        console.log(error);
    }
};

export default fetchProducts;

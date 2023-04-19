import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const setupCompanies = (store) => {
    // start of displaying the brands on the left pannel
    let companies = [
        "all",
        ...new Set(
            store.map((product) => {
                return product.company;
            })
        ),
    ];

    const companiesDOM = getElement(".companies");
    companiesDOM.innerHTML = companies
        .map((company) => {
            return `<button class="company-btn">${company}</button>`;
        })
        .join("");
    // end of displaying the brands on the left pannel

    // start of displaying the products that were sold by a chosen company
    companiesDOM.addEventListener("click", function (event) {
        const element = event.target;
        if (element.classList.contains("company-btn")) {
            let newStore = [];
            if (element.textContent === "all") {
                newStore = [...store];
            } else {
                newStore = store.filter((product) => {
                    return product.company === event.target.textContent;
                });
            }
            display(newStore, getElement(".products-container"), true);
        }
    });
};

export default setupCompanies;

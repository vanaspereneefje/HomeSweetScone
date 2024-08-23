import { bakeryItems } from './bakery-items.js';

//create filterbar
const filtersDiv = document.createElement("div");
document.querySelector(".filterbar").appendChild(filtersDiv);
filtersDiv.classList.add("filters");

const filtersText = document.createElement("p");
document.querySelector(".filters").appendChild(filtersText);
let filterNode = document.createTextNode("Filters:");
filtersText.appendChild(filterNode);


const productsText = document.createElement("p");
document.querySelector(".filters").appendChild(productsText);
let productsNode = document.createTextNode("Products:");
productsText.appendChild(productsNode);

bakeryItems.type.forEach((element) => {
    let productInput = document.createElement("input");
    document.querySelector(".filters").appendChild(productInput);
    let productNode = document.createTextNode(element.type);
    input.setAttribute('checkbox', productNode);
    productInput.classList.add(productNode);
});


const allergensText = document.createElement("p");
document.querySelector(".filters").appendChild(allergensText);
let allergensNode = document.createTextNode("Allergens:");
allergensText.appendChild(allergensNode);

bakeryItems.allergens.forEach((element) => {
    let allergenInput = document.createElement("input");
    document.querySelector(".filters").appendChild(allergenInput);
    let allergenNode = document.createTextNode(element.allergens);
    input.setAttribute('checkbox', allergenNode);
    productInput.classList.add(allergenNode);
});


const toppingsText = document.createElement("p");
document.querySelector(".filters").appendChild(toppingsText);
let toppingsNode = document.createTextNode("Toppings/fillings:");
toppingsText.appendChild(toppingsNode);

bakeryItems.flavour.forEach((element) => {
    let flavourInput = document.createElement("input");
    document.querySelector(".filters").appendChild(flavourInput);
    input.setAttribute('checkbox', bakeryItems.flavour);
    productInput.classList.add(`${bakeryItems.flavour}`);
});



searchBar.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const filteredProducts = bakeryItems.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.type.toLowerCase().includes(query) ||
        product.flavour.toLowerCase().includes(query) ||
        product.allergens.some(allergen => allergen.toLowerCase().includes(query)) // Check if any allergen matches the query
    );
    displayBakeryProducts(filteredProducts);
});

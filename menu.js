import { bakeryItems } from "./bakery-items.js";

const filterItems = [
    {
        type: ["Cupcake", "Donut", "Pie", "Scone", "Cookie"],
        flavour: ["Cherry", "Chocolate Chip", "Peanut Butter","Oatmeal Raisin", "Biscoff", "Boston Cream", "Plain", "Jam","Oatmeal", "Blueberry", "Lemon", "Apple", "Pumpkin", "Chocolate", "Vanilla", "Coconut"],
        allergens: ["gluten", "dairy", "eggs", "Soy", "Peanuts"],
    }]

const filtersDiv = document.createElement("div");
document.querySelector(".filterbar").appendChild(filtersDiv);
filtersDiv.classList.add("filters");

const filtersText = document.createElement("p");
document.querySelector(".filters").appendChild(filtersText);
let filterNode = document.createTextNode("Filters:");
filtersText.appendChild(filterNode);

// Function to add checkboxes for each filter category
function addCheckboxes(filterCategory, categoryName) {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add(`filter-category-${categoryName.toLowerCase()}`);
    
    // Create and append category header
    const categoryHeader = document.createElement("p");
    categoryHeader.textContent = `${categoryName}:`;
    categoryDiv.appendChild(categoryHeader);
    
    filterCategory.forEach(item => {
        let sanitizedItem = item.replace(/\s+/g, '-').toLowerCase(); // Sanitize the item for safe use
        let productInput = document.createElement("input");
        productInput.type = "checkbox";
        productInput.id = sanitizedItem;
        productInput.value = item;  // Add value for easier retrieval
        
        let label = document.createElement("label");
        label.htmlFor = item;
        label.textContent = ` ${item}`;

        categoryDiv.appendChild(productInput);
        categoryDiv.appendChild(label);
        categoryDiv.appendChild(document.createElement("br")); // Add line break for spacing
    });

    // Append the category div to the filters div
    document.querySelector(".filters").appendChild(categoryDiv);
}

// Extracting the filter categories from the filterItems array
const filterItem = filterItems[0];
addCheckboxes(filterItem.type, "Type");
addCheckboxes(filterItem.flavour, "Flavour");
addCheckboxes(filterItem.allergens, "Allergens");




const bakeryContainer = document.querySelector(".products");
const searchBar = document.getElementById("search-bar");

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

const displayBakeryProducts = (bakeryList) => {
  bakeryContainer.innerHTML = "";

  // Get the current cart data from localStorage (if any)
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

  bakeryList.forEach((product) => {
    const cardContainer = document.createElement("div");
    cardContainer.className = "card";
    cardContainer.setAttribute("data-product-id", product.id);

    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.className = "product-image";
    productImage.alt = `Our bakery's own ${product.name}`;
    cardContainer.appendChild(productImage);

    const productName = document.createElement("h2");
    productName.textContent = product.name;
    cardContainer.appendChild(productName);

    const buttonBox = document.createElement("div");
    buttonBox.className = "button-box-product";
    cardContainer.appendChild(buttonBox);

    const productPrice = document.createElement("h5");
    productPrice.textContent = `€ ${product.price}`;
    buttonBox.appendChild(productPrice);

    // Add to cart + increment/decrement buttons

    const shopButtons = document.createElement("div");
    shopButtons.className = "add-to-cart-box";
    buttonBox.appendChild(shopButtons);

    const itemNumber = document.createElement("div");
    itemNumber.className = "item-nmbr";
    itemNumber.textContent = "0";
    shopButtons.appendChild(itemNumber);

    const addRemoveIcons = document.createElement("div");
    addRemoveIcons.className = "add-remove-icons";
    shopButtons.appendChild(addRemoveIcons);

    const incrementBtn = document.createElement("img");
    incrementBtn.className = "increment-btn";
    incrementBtn.src = "./Images/increment-icon.png";
    incrementBtn.alt =
      "increase the number of articles to be added to the cart";
    addRemoveIcons.appendChild(incrementBtn);

    const decrementBtn = document.createElement("img");
    decrementBtn.className = "decrement-btn";
    decrementBtn.src = "./Images/decrement-icon.png";
    decrementBtn.alt =
      "decrease the number of articles to be added to the cart";
    addRemoveIcons.appendChild(decrementBtn);

    const addCartBox = document.createElement("div");
    addCartBox.className = "add-to-cart-inner-box";
    shopButtons.appendChild(addCartBox);

    const addCart = document.createElement("img");
    addCart.className = "add-to-cart";
    addCart.src = "./Images/shopping-cart-icon.png";
    addCart.alt = "add to the shopping cart";
    addCartBox.appendChild(addCart);

    const infoIcon = document.createElement("img");
    infoIcon.src = "./Images/Info-icon.png";
    infoIcon.style.height = "40px";
    infoIcon.className = "iIcon";
    buttonBox.appendChild(infoIcon);

    const bakeryCardBack = document.createElement("div");
    bakeryCardBack.className = "card-back";

    infoIcon.addEventListener("click", () => {
      bakeryCardBack.style.transform = "translateY(-340px)";
      bakeryCardBack.style.backgroundColor = "var(--switch-darker-pink-transp)";
      cardContainer.style.color = "var(--switch-white-bg)";
      bakeryCardBack.style.color = "var(--switch-black)";

      infoIcon.style.display = "none";
      buttonBox.style.display = "none";
    });

    const exitIcon = document.createElement("img");
    exitIcon.src = "./Images/exit-icon.png";
    exitIcon.style.height = "30px";
    exitIcon.style.width = "30px";
    exitIcon.className = "exitIcon";
    bakeryCardBack.appendChild(exitIcon);

    exitIcon.addEventListener("click", () => {
      bakeryCardBack.style.transform = "translateY(400px)";
      bakeryCardBack.style.backgroundColor = "rgba(0, 0, 0, 0)";
      cardContainer.style.color = "black";
      infoIcon.style.display = "inline-block";
      buttonBox.style.display = "flex";
    });

    const productType = document.createElement("h3");
    productType.textContent = product.type;

    const productFlavor = document.createElement("h3");
    productFlavor.textContent = `Flavor: ${product.flavour}`;
    bakeryCardBack.appendChild(productFlavor);

    const productIngredients = document.createElement("h4");
    productIngredients.textContent = `Ingredients: ${product.ingredients.join(
      ", "
    )}`;
    bakeryCardBack.appendChild(productIngredients);

    const productAllergens = document.createElement("h4");
    productAllergens.textContent = `Allergens: ${product.allergens.join(", ")}`;
    bakeryCardBack.appendChild(productAllergens);

    // Assemble the card
    cardContainer.appendChild(bakeryCardBack);
    bakeryContainer.appendChild(cardContainer);

    // Event listeners for increment and decrement
    incrementBtn.addEventListener("click", () => {
      itemNumber.textContent = parseInt(itemNumber.textContent) + 1;
    });

    decrementBtn.addEventListener("click", () => {
      let currentValue = parseInt(itemNumber.textContent);
      if (currentValue > 0) {
        itemNumber.textContent = currentValue - 1;
      }
    });

    // Load saved quantity from localStorage for this specific product
    const savedItem = storedCart.find((item) => item.id === product.id);
    if (savedItem) {
      itemNumber.textContent = savedItem.quantity;
    } else {
      itemNumber.textContent = "0";
    }

    // Save to localStorage only when "Add to Cart" button is clicked
    addCart.addEventListener("click", () => {
      saveToLocalStorage(product.id, itemNumber.textContent);
    });
  });

  // Function to save data to localStorage when "Add to Cart" is clicked
  function saveToLocalStorage(productId, quantity) {
    const parsedQuantity = parseInt(quantity);

    if (parsedQuantity > 0) {
      // Create an object for the current product
      const productData = {
        id: productId,
        name: bakeryItems.find((item) => item.id === productId).name,
        price: bakeryItems.find((item) => item.id === productId).price,
        quantity: parsedQuantity,
      };

      // Check if the item is already in the cart
      const existingItemIndex = storedCart.findIndex(
        (item) => item.id === productId
      );

      if (existingItemIndex >= 0) {
        // Update the existing item's quantity
        storedCart[existingItemIndex] = productData;
      } else {
        // Add the new item to the cart
        storedCart.push(productData);
      }

      // Save the updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(storedCart));
    }
  }
};

// Initial display of all bakery products
displayBakeryProducts(bakeryItems);

// Search functionality
searchBar.addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase();
  const filteredProducts = bakeryItems.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.type.toLowerCase().includes(query) ||
      product.flavour.toLowerCase().includes(query) ||
      product.allergens.some((allergen) =>
        allergen.toLowerCase().includes(query)
      ) // Check if any allergen matches the query
  );
  displayBakeryProducts(filteredProducts);
});

/*// Accessing the type array from filterItems
const typeIds = filterItems[0].type;
const allergenId = filterItems[0].allergens;
const flavourId = filterItems[0].flavour;


// Store the currently selected filters
let selectedFilters = new Set();
let selectedTypes = new Set();
let selectedFlavours = new Set();
let selectedAllergens = new Set();

typeIds.forEach(id => {
    let sanitizedId = id.replace(/\s+/g, '-').toLowerCase(); // Use the same sanitized ID
    const checkbox = document.getElementById(sanitizedId); // Retrieve the checkbox element by ID
    let filtersSelected = 0;
    // Add event listener to each checkbox
    checkbox.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
            // Add the filter to the set of selected filters
            selectedFilters.add(sanitizedId);
            filtersSelected+=1;
        } else {
            // Remove the filter from the set if unchecked
            selectedFilters.delete(sanitizedId);
            filtersSelected-=1;
        }

        // Filter the products based on all selected filters
        const filteredProducts = bakeryItems.filter((product) =>
            [...selectedFilters].some(filter =>
                product.type.toLowerCase().includes(filter) ||
                product.flavour.toLowerCase().includes(filter) ||
                product.allergens.some((allergen) =>
                    allergen.toLowerCase().includes(filter)
                )
            )
        );

        // Display the filtered products or display all products if no filters are selected
        if(filtersSelected == 0){
            displayBakeryProducts(bakeryItems);
        } else {
            displayBakeryProducts(filteredProducts);
        }
    });
});*/

// Function to handle checkbox change events
function handleCheckboxChange(event, selectedSet) {
    const sanitizedId = event.currentTarget.id; // Get the sanitized ID from the checkbox
    if (event.currentTarget.checked) {
        selectedSet.add(sanitizedId);
    } else {
        selectedSet.delete(sanitizedId);
    }
    filterProducts();
}

// Function to attach event listeners to checkboxes
function attachCheckboxListeners(filterCategory, selectedSet) {
    filterCategory.forEach(id => {
        const sanitizedId = id.replace(/\s+/g, '-').toLowerCase();
        const checkbox = document.getElementById(sanitizedId);
        if (checkbox) {
            checkbox.addEventListener('change', (event) => handleCheckboxChange(event, selectedSet));
        }
    });
}

// Store the currently selected filters
let selectedTypes = new Set();
let selectedFlavours = new Set();
let selectedAllergens = new Set();

// Attach listeners to the checkboxes
attachCheckboxListeners(filterItem.type, selectedTypes);
attachCheckboxListeners(filterItem.flavour, selectedFlavours);
attachCheckboxListeners(filterItem.allergens, selectedAllergens);

// Function to filter products based on selected filters
function filterProducts() {
    const filteredProducts = bakeryItems.filter(product => {
        const typeMatch = selectedTypes.size === 0 || selectedTypes.has(product.type.toLowerCase().replace(/\s+/g, '-'));
        const flavourMatch = selectedFlavours.size === 0 || selectedFlavours.has(product.flavour.toLowerCase().replace(/\s+/g, '-'));
        const allergenMatch = selectedAllergens.size === 0 || product.allergens.some(allergen => selectedAllergens.has(allergen.toLowerCase().replace(/\s+/g, '-')));

        return typeMatch && flavourMatch && allergenMatch;
    });

    displayBakeryProducts(filteredProducts);
}

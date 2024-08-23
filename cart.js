const switchTheme = () => {
  //Get the root element and the data-theme value
  const rootElem = document.documentElement;
  let dataTheme = rootElem.getAttribute("data-theme"),
    newTheme;

  newTheme = dataTheme === "light" ? "dark" : "light"; // if dataTheme = light then new Theme will be = dark else will be equal to light

  //Set the new HTML attribute
  rootElem.setAttribute("data-theme", newTheme);

  //Set the new local storage item
  localStorage.setItem("theme", newTheme);
};

// Add event listener for the theme switcher
document
  .querySelector("#theme-switcher")
  .addEventListener("click", switchTheme);

document.querySelectorAll(".quantity-btn").forEach((button) => {
  button.addEventListener("click", function () {
    let input = this.parentNode.querySelector("input");
    let value = parseInt(input.value);
    if (this.textContent === "+") {
      input.value = value + 1;
    } else if (this.textContent === "-" && value > 1) {
      input.value = value - 1;
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const updateCartButton = document.querySelector(".update-cart-btn");
  const quantityInputs = document.querySelectorAll('input[type="text"]');
  const subtotals = document.querySelectorAll("td:nth-child(4)");
  const subtotalElement = document.querySelector(
    ".cart-summary p:nth-child(2)"
  );
  const grandTotalElement = document.querySelector(
    ".cart-summary p:nth-child(4)"
  );
  const removeButtons = document.querySelectorAll(".remove-btn");

  function updateCart() {
    let subtotal = 0;

    quantityInputs.forEach((input, index) => {
      const quantity = parseInt(input.value);
      const price = parseFloat(
        subtotals[index].parentNode.children[1].textContent.replace(" $", "")
      );
      const itemSubtotal = quantity * price;

      subtotals[index].textContent = itemSubtotal.toFixed(2) + " $";
      subtotal += itemSubtotal;
    });

    subtotalElement.textContent = "Subtotal: " + subtotal.toFixed(2) + " $";
    grandTotalElement.textContent =
      "Grand Total: " + subtotal.toFixed(2) + " $";
  }

  // Event listener for updating the cart
  updateCartButton.addEventListener("click", updateCart);

  // Event listeners for increment and decrement buttons

  document.querySelectorAll(".quantity-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const input = this.parentNode.querySelector('input[type="text"]');
      let currentValue = parseInt(input.value) || 0;

      if (this.textContent === "+") {
        input.value = currentValue + 1;
      } else if (this.textContent === "-" && currentValue > 0) {
        input.value = currentValue - 1;
      }

      updateCart();
    });
  });

  // Remove item from cart
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const row = this.closest("tr");
      row.remove();
      updateCart();
    });
  });

  // Initial call to ensure totals are correct when the page loads
  updateCart();
});

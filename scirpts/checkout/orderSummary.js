import {
  cart,
  removeFromCart,
  updateCartCheckout,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import {
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryDate,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary() {
  let cartHtml = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    cartHtml += `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
          Delivery date: ${calculateDeliveryDate(deliveryOption)}
      </div>
  
      <div class="cart-item-details-grid">
          <img class="product-image"
          src="${matchingProduct.image}">
  
          <div class="cart-item-details">
          <div class="product-name">
              ${matchingProduct.name}
          </div>
          <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
              <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${
                matchingProduct.id
              }">
              Update
              </span>
              <input class="quantity-input" data-product-id="${
                matchingProduct.id
              }">
              <span class="save-quantity-link link-primary" data-product-id="${
                matchingProduct.id
              }">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                matchingProduct.id
              }">
              Delete
              </span>
          </div>
          </div>
  
          <div class="delivery-options">
          <div class="delivery-options-title">
              Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
      </div>
      </div>
      `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)} - `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html += `
          <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
              <input type="radio"
              ${isChecked ? "checked" : ""}
              class="delivery-option-input"
              name="${matchingProduct.id}">
              <div>
              <div class="delivery-option-date">
                  ${calculateDeliveryDate(deliveryOption)}
              </div>
              <div class="delivery-option-price">
                  ${priceString} Shipping
              </div>
              </div>
          </div>
          `;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartHtml;

  renderCheckoutHeader(updateCartCheckout());

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      document
        .querySelector(`.js-cart-item-container-${productId}`)
        .classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      handleSave(productId);
    });
  });

  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const productId = input.dataset.productId;
        handleSave(productId);
      }
    });
  });

  function handleSave(productId) {
    document
      .querySelector(`.js-cart-item-container-${productId}`)
      .classList.remove("is-editing-quantity");

    let inputValue = Number(document.querySelector(".quantity-input").value);
    if (inputValue < 1000 && inputValue > 0 && inputValue != "") {
      updateQuantity(productId, inputValue);
      document.querySelector(".quantity-label").innerHTML = inputValue;
      document.querySelector(".quantity-input").value = "";
    } else {
      alert("enter valid value");
      document.querySelector(".quantity-input").value = "";
    }
    renderOrderSummary();
    renderPaymentSummary();
  }

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    const { productId, deliveryOptionId } = element.dataset;
    element.addEventListener("click", () => {
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

import { orders } from "../data/orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { formatCurrency } from "./utils/money.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart-class.js";

async function renderOrdersPage() {
  await loadProductsFetch();
  let orderHeaderHtml = "";
  

  orders.forEach((order) => {
    orderHeaderHtml += `
    <div class="order-container">

          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${calculateDate(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid js-order-details-${order.id}">
            ${renderProducts(order)}
            </div>
          </div>
        </div>
    `;
  });

  function renderProducts(order) {
    let html=''
    order.products.forEach((product) => {
      const matchingProduct = getProduct(product.productId);
      html += `
        <div class="product-image-container">
            <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-delivery-date">
                Arriving on: ${calculateDate(product.estimatedDeliveryTime)}
            </div>
            <div class="product-quantity">
                Quantity: ${product.quantity}
            </div>
            <button class="buy-again-button button-primary js-buy-again" 
              data-product-id="${matchingProduct.id}" data-product-quantity="${product.quantity}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
            </button>
        </div>

        <div class="product-actions">
            <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
                <button class="track-package-button button-secondary">
                    Track package
                </button>
            </a>
        </div>
        `;
    });
    return html
  }

  document.querySelector(".js-orders-grid").innerHTML = orderHeaderHtml;



  document.querySelector('.js-cart-quantity').innerHTML=cart.updateCartCheckout()

  document.querySelectorAll('.js-buy-again').forEach((but)=>{
    but.addEventListener('click',()=>{
      const productId=but.dataset.productId
      const productQuant=but.dataset.productQuantity
      
      cart.addToCart(productId,productQuant)
      cart.saveToStorage()

      renderOrdersPage();
    })
  })
}
renderOrdersPage();

export function calculateDate(rawDate) {
  let date = dayjs(rawDate);
  let formated = date.format("MMMM D");
  return formated;
}

export function getOrder(orderId) {
  let matchingOrder;
  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  return matchingOrder;
}

document.querySelector('.js-search-button').addEventListener('click',()=>{
  const search=document.querySelector('.js-search-bar').value
    window.location.href=`amazon.html?search=${search}`
})
document.querySelector('.js-search-bar').addEventListener('keydown',(event)=>{
  if (event.key==='Enter') {
    const search=document.querySelector('.js-search-bar').value
    window.location.href=`amazon.html?search=${search}`
  }
})
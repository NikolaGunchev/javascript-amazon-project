import { getOrder, calculateDate } from "./orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart-class.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

async function renderTrackingPage(){
    await loadProductsFetch()

    const url=new URL(window.location.href)
    const orderId=url.searchParams.get('orderId')
    const productId=url.searchParams.get('productId')
    
    const matchingOrder=getOrder(orderId)
    let productCopy
    let html=''

     matchingOrder.products.forEach((product) => {
        if (product.productId===productId) {
            productCopy=product
            const matchingProduct=getProduct(productId)
        html=`
    <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on Monday, ${calculateDate(product.estimatedDeliveryTime)}
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${product.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container order-container-${matchingOrder.id}">
          <div class="progress-label-prep">
            Preparing
          </div>
          <div class="progress-label-ship">
            Shipped
          </div>
          <div class="progress-label-del">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width:${calculateProgress(product.estimatedDeliveryTime)}%"></div>
        </div>
    `
        } else return
    });
    document.querySelector('.js-order-tracking').innerHTML=html
    document.querySelector('.js-cart-quantity').innerHTML=cart.updateCartCheckout()

    function calculateProgress(delivery){
        let currentDay=dayjs()
        let orderTime=dayjs(matchingOrder.orderTime)
        let deliveryTime=dayjs(delivery)

        let progress=((currentDay-orderTime)/(deliveryTime-orderTime))*100
        progress = Math.min(Math.max(progress, 0), 100);

        return progress
    }

    function changeColor(progress) {
        const orderContainer = document.querySelector(`.order-container-${orderId}`);
        
        const prepLabel = orderContainer.querySelector('.progress-label-prep');
        const shipLabel = orderContainer.querySelector('.progress-label-ship');
        const delLabel = orderContainer.querySelector('.progress-label-del');
        
        prepLabel.classList.remove('current-status');
        shipLabel.classList.remove('current-status');
        delLabel.classList.remove('current-status');
        
        if (progress >= 0 && progress <= 49) {
            prepLabel.classList.add('current-status');
        } else if (progress >= 50 && progress <= 99) {
            shipLabel.classList.add('current-status');
        } else {
            delLabel.classList.add('current-status');
        }
      }
      
      changeColor(calculateProgress(productCopy.estimatedDeliveryTime))
}
renderTrackingPage()
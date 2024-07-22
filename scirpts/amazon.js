import { products, loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart-class.js";

loadProductsFetch().then(() => {
  renderProductsGrids();
});

function renderProductsGrids() {
  const url=new URL(window.location.href)
  const searched=url.searchParams.get('search')

  let productsHtml = '';
  if (!searched) {
    products.forEach((product) => {
      productsHtml += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>
          ${product.getPrice()}
          <div class="product-price">
            
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
  });
  } else {
    productsHtml = renderFilteredPage(searched);
  }
  
  document.querySelector(".js-productsGrid").innerHTML = productsHtml;

  const addedMessageTimeouts = {};

  let quantity = document.querySelector(".js-cart-quantity");
  quantity.innerHTML = cart.updateCartCheckout();

  function addedMessageShow(addedMessage, productId) {
    addedMessage.style.opacity = 1;

    const previousTimeoutId = addedMessageTimeouts[productId];
    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      addedMessage.style.opacity = 0;
    }, 2000);
    addedMessageTimeouts[productId] = timeoutId;
  }

  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      //const productId=button.dataset.productId
      const { productId } = button.dataset;
      const itemQuantity = Number(
        document.querySelector(`.js-quantity-selector-${productId}`).value
      );
      const addedMessage = document.querySelector(`.js-added-${productId}`);

      cart.addToCart(productId, itemQuantity);
      quantity.innerHTML = cart.updateCartCheckout();
      addedMessageShow(addedMessage, productId);
    });
  });

  function renderFilteredPage(searched){
    let productsHtml=''
    products.forEach((product)=>{
      if (product.name.toLowerCase().includes(searched.toLowerCase()) || product.keywords.includes(searched.toLowerCase())) {
        productsHtml += `
          <div class="product-container">
                <div class="product-image-container">
                  <img class="product-image"
                    src="${product.image}">
                </div>
      
                <div class="product-name limit-text-to-2-lines">
                  ${product.name}
                </div>
      
                <div class="product-rating-container">
                  <img class="product-rating-stars"
                    src="${product.getStarsUrl()}">
                  <div class="product-rating-count link-primary">
                    ${product.rating.count}
                  </div>
                </div>
                ${product.getPrice()}
                <div class="product-price">
                  
                </div>
      
                <div class="product-quantity-container">
                  <select class="js-quantity-selector-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
      
                ${product.extraInfoHTML()}
      
                <div class="product-spacer"></div>
      
                <div class="added-to-cart js-added-${product.id}">
                  <img src="images/icons/checkmark.png">
                  Added
                </div>
      
                <button class="add-to-cart-button button-primary js-add-to-cart"
                data-product-id="${product.id}">
                  Add to Cart
                </button>
              </div>
          `;
        }
    })
      return productsHtml;
  }
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


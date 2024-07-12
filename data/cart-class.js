class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [
      {
        productId: "jpglb2847e9-5323-403f-b7cf-57fde044a955",
        quantity: 1,
        deliveryOptionId: "1",
      },
    ];
  }

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  updateCartCheckout() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  }

  addToCart(productId, itemQuantity) {
    let matchingItemFromCart;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItemFromCart = cartItem;
      }
    });

    if (matchingItemFromCart) {
      matchingItemFromCart.quantity += itemQuantity;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: itemQuantity,
        deliveryOptionId: "1",
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId != productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;
    this.saveToStorage();
  }

  updateQuantity(productId, newQuantity) {
    let matchingItemFromCart;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItemFromCart = cartItem;
      }
      matchingItemFromCart.quantity = newQuantity;
    });
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItemFromCart;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItemFromCart = cartItem;
      }
    });

    matchingItemFromCart.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

const cart = new Cart("cart-oop");
const bussinesCart = new Cart("bussinesCart-oop");

console.log(cart);
console.log(bussinesCart);

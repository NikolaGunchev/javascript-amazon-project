export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    productId,
    quantity,
    deliveryOptionId,
  },
];

export function updateCartCheckout() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("quantity", JSON.stringify(updateCartCheckout()));
}

export function addToCart(productId, itemQuantity) {
  let matchingItemFromCart;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItemFromCart = cartItem;
    }
  });

  if (matchingItemFromCart) {
    matchingItemFromCart.quantity += itemQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: itemQuantity,
      deliveryOptionId: "1",
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId != productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
  let matchingItemFromCart;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItemFromCart = cartItem;
    }
    matchingItemFromCart.quantity = newQuantity;
  });
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItemFromCart;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItemFromCart = cartItem;
    }
  });

  matchingItemFromCart.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

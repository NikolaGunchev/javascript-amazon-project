export let cart = JSON.parse(localStorage.getItem("cart")) ||
[
  {
    productId,
    quantity
  },
];

export function updateCartCheckout() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity
}

function saveToStorage(){
  localStorage.setItem("cart",JSON.stringify(cart));
  localStorage.setItem('quantity',JSON.stringify(updateCartCheckout()));
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

export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "jpglb2847e9-5323-403f-b7cf-57fde044a955",
    quantity: 1,
  },
];

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
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId != productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
}

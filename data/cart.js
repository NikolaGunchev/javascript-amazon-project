export let cart=[];

export function addToCart(productId,itemQuantity){
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
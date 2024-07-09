import { cart, addToCart, loadFromStorage } from "../../data/cart.js";

describe("test suite: addToCart", () => {
  it("add existing product to cart", () => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "jpglb2847e9-5323-403f-b7cf-57fde044a955",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();

    addToCart("jpglb2847e9-5323-403f-b7cf-57fde044a955", 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(
      "jpglb2847e9-5323-403f-b7cf-57fde044a955"
    );
    expect(cart[0].quantity).toEqual(2);
  });

  it("add new product to cart", () => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart("jpglb2847e9-5323-403f-b7cf-57fde044a955", 1, '1');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(
      "jpglb2847e9-5323-403f-b7cf-57fde044a955"
    );
    expect(cart[0].quantity).toEqual(1);
  });
});

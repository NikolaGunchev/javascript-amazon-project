import { renderOrderSummary } from "../../scirpts/checkout/orderSummary.js";
import { loadFromStorage } from "../../data/cart.js";

describe("test suite: renderOrderSummary", () => {
  it("displays the cart", () => {
    document.querySelector(".js-order-summary-test").innerHTML = `
<div class='js-order-summary'></div>
`;
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "jpglb2847e9-5323-403f-b7cf-57fde044a955",
          quantity: 1,
          deliveryOptionId: "1",
        },
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "2",
        },
      ]);
    });
    loadFromStorage();

    renderOrderSummary();
  });
});

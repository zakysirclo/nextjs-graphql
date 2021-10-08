import { makeVar } from "@apollo/client";

const initCart = {
  items: [],
  totalItem: 0,
  totalQty: 0,
  totalTax: 0,
  subTotal: 0,
  grandTotal: 0,
};

function persistLocalStorage() {
  if (typeof window !== "undefined" && localStorage.getItem("cartVar")) {
    return JSON.parse(localStorage.getItem("cartVar"));
  }

  return initCart;
}

export const cartVar = makeVar(persistLocalStorage());

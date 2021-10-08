import { cartVar } from "./state.js";

/*  
    {
        items: [
            {
                sku: "string",
                name: "string",
                qty: "float",
                price: "float"
                total: "float"
            }
        ]
        totalItem: 0,
        totalQty: 0,
        totalTax = 0,
        subTotal: 0,
        grandTotal: 0,
    }
*/

const calculateTotal = (items) => {
  let totalItem = 0;
  let totalQty = 0;
  let totalTax = 0;
  let subTotal = 0;
  let grandTotal = 0;

  items.map((item) => {
    totalItem += 1;
    totalQty += item.qty;
    subTotal += item.qty * item.price;
    // grandTotal += item.qty * item.price;
  });

  totalTax = (subTotal * 10) / 100;
  grandTotal = subTotal + totalTax;

  return {
    totalItem,
    totalQty,
    totalTax,
    subTotal,
    grandTotal,
  };
};

export function addToCart(item) {
  const cart = cartVar();
  const { items } = cart;

  let updatedItems = [];
  updatedItems.push(item);

  let checkItemExist = items.filter(
    (itemExist) => itemExist.sku === item.sku
  ).length;

  // Jika belum ada tinggal ditambahkan
  if (checkItemExist === 0) {
    updatedItems = items;
    updatedItems.push(item);
  }
  // Jika sudah ada tambah qty nya
  else {
    let uItems = [];
    items.map((oldItem) => {
      let uItem = oldItem;
      if (oldItem.sku === item.sku) {
        let qty = oldItem.qty + item.qty;
        let total = oldItem.price * qty;
        uItem = { ...oldItem, qty, total };
      }
      uItems.push(uItem);
    });
    updatedItems = uItems;
  }

  let totalAll = calculateTotal(updatedItems);
  let updatedCart = {
    items: updatedItems,
    totalItem: totalAll.totalItem,
    totalQty: totalAll.totalQty,
    totalTax: totalAll.totalTax,
    subTotal: totalAll.subTotal,
    grandTotal: totalAll.grandTotal,
  };

  cartVar(updatedCart);
  localStorage.setItem("cartVar", JSON.stringify(updatedCart));
}

export function removeFromCart(sku) {
  const cart = cartVar();
  const { items } = cart;

  let updatedItems = items.filter((item) => item.sku !== sku);

  let totalAll = calculateTotal(updatedItems);
  let updatedCart = {
    items: updatedItems,
    totalItem: totalAll.totalItem,
    totalQty: totalAll.totalQty,
    totalTax: totalAll.totalTax,
    subTotal: totalAll.subTotal,
    grandTotal: totalAll.grandTotal,
  };

  cartVar(updatedCart);
  localStorage.setItem("cartVar", JSON.stringify(updatedCart));
}

export function changeItemQty(item, updateQty) {
  const cart = cartVar();
  const { items } = cart;

  let updatedItems = [];

  items.map((oldItem) => {
    let uItem = oldItem;
    if (oldItem.sku === item.sku) {
      let qty = updateQty;
      let total = oldItem.price * updateQty;
      uItem = { ...oldItem, qty, total };
    }
    updatedItems.push(uItem);
  });

  let totalAll = calculateTotal(updatedItems);
  let updatedCart = {
    items: updatedItems,
    totalItem: totalAll.totalItem,
    totalQty: totalAll.totalQty,
    totalTax: totalAll.totalTax,
    subTotal: totalAll.subTotal,
    grandTotal: totalAll.grandTotal,
  };

  cartVar(updatedCart);
  localStorage.setItem("cartVar", JSON.stringify(updatedCart));
}

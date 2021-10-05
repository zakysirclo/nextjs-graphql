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
        subTotal: 0,
        grandTotal: 0,
    }
*/

const calculateTotal = (items) => {
  let totalItem = 0;
  let totalQty = 0;
  let subTotal = 0;
  let grandTotal = 0;

  items.map((item) => {
    totalItem += 1;
    totalQty += item.qty;
    subTotal += item.qty * item.price;
    grandTotal += item.qty * item.price;
  });

  return {
    totalItem,
    totalQty,
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
    subTotal: totalAll.subTotal,
    grandTotal: totalAll.grandTotal,
  };

  cartVar(updatedCart);
  localStorage.setItem("cartVar", JSON.stringify(updatedCart));
}

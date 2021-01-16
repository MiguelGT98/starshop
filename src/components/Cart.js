import React, { useEffect, useState } from "react";

const Cart = () => {
  // Variables to hold cart state
  const [products, setProducts] = useState({});
  const [total, setTotal] = useState(0);
  const [showingCart, setShowingCart] = useState(false);

  useEffect(() => {
    // Initialize products object from local storage.
    // By having everything on local storage, we can persist user cart and react to changes that happened on other tabs or windows.

    setProducts(JSON.parse(window.localStorage.getItem("cart")) || {});
    // Set an event listener for local storage.
    window.addEventListener("storage", reactToCartChange);

    // Remove event listener.
    return () => {
      window.removeEventListener("storage", reactToCartChange);
    };
  }, []);

  // Every time products changes, update the total amount
  useEffect(() => {
    setTotal(
      Object.keys(products).reduce((currentTotal, key) => {
        return (currentTotal += products[key].quantity * products[key].price);
      }, 0)
    );
  }, [products]);

  // Function to update cart from localStorage.
  const reactToCartChange = (id) => {
    setProducts(JSON.parse(window.localStorage.getItem("cart")) || {});
  };

  // Function to delete product from cart.
  const deleteFromCart = (id) => {
    // Get current cart from local storage
    const currentCart = JSON.parse(window.localStorage.getItem("cart")) || {};

    // Decrease it's quantity or delete it
    if (currentCart[id].quantity > 1) {
      currentCart[id].quantity -= 1;
    } else {
      delete currentCart[id];
    }

    // Update local storage and dispatch a storage event to update the cart
    window.localStorage.setItem("cart", JSON.stringify(currentCart));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="text-gray-700">
      <div className="relative">
        <span
          className="cursor-pointer"
          onClick={() => setShowingCart(!showingCart)}
        >
          🛒 My cart (
          {Object.keys(products).reduce(
            (count, key) => (count += products[key].quantity),
            0
          )}
          )
        </span>
        <ul
          className={`${
            showingCart ? "block" : "hidden"
          } absolute z-10 bg-white mt-2 p-4 rounded-md shadow-md border w-96 right-0`}
        >
          {
            /* If cart is empty */
            Object.keys(products).length === 0 ? (
              <li>Your cart is empty, add some items.</li>
            ) : (
              <></>
            )
          }
          {Object.keys(products).map((key) => {
            return (
              <li className="flex text-sm justify-between">
                <span>
                  <span
                    className="mr-2 cursor-pointer"
                    onClick={() => deleteFromCart(key)}
                  >
                    ⛔
                  </span>
                  <span>
                    {products[key].name} ({products[key].quantity})
                  </span>
                </span>
                <span>
                  💰 {parseFloat(products[key].price).toLocaleString()}
                </span>
              </li>
            );
          })}
          <li className="flex text-lg justify-between font-bold mt-2 text-gray-900">
            <span>Total</span>
            <span>💰 {total.toLocaleString()}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Cart;

import React from "react";

const PreviewItem = ({
  url: id,
  name,
  cost_in_credits: price,
  manufacturer,
  addToCart,
}) => {
  // Function to add item to cart.
  const onAddToCart = () => {
    addToCart(id, { name, price: price === "unknown" ? "0" : price }, 1);
  };

  return (
    <div className="border shadow-md rounded-md px-6 py-3 flex flex-wrap justify-between flex-col">
      <div className="details">
        <h3 className="text-xl font-medium leading-tight">{name}</h3>
        <p className="text-sm text-gray-500">{manufacturer}</p>
        <p className="font-light text-lg mt-1">
          💰{" "}
          {price === "unknown"
            ? "Priceless"
            : parseFloat(price).toLocaleString()}
        </p>
      </div>
      <button
        className="bg-blue-500 rounded text-white uppercase text-sm px-4 py-2 w-full mt-3"
        onClick={onAddToCart}
      >
        Add to cart!
      </button>
    </div>
  );
};

export default PreviewItem;

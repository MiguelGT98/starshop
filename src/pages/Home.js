import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PreviewItem from "../components/PreviewItem";

const apiPath = "/.netlify/functions/getProducts";

const Home = ({ location }) => {
  // Variable to hold current query state
  const [queryState, setQueryState] = useState("loading");

  // Variable to hold all products
  const [products, setProducts] = useState([]);

  // Variable to hold current filter
  const [filter, setFilter] = useState("starships");

  // Variables to perform pagination
  const [page, setPage] = useState(1);
  const [canNextPage, setCanNextPage] = useState(true);

  // Change filter every time location changes
  useEffect(() => {
    if (location.search) {
      setFilter(location.search.split("?product=")[1]);
      setPage(1);
    } else {
      setFilter("starships");
      setPage(1);
    }
  }, [location]);

  // Everytime the filter or page changes, fetch for the products
  // Using a netlify function due to CORS issues
  useEffect(async () => {
    if (filter !== "")
      try {
        setQueryState("loading");
        const response = await fetch(
          `${apiPath}/?filter=${filter}&page=${page}`,
          {
            headers: { accept: "Accept: application/json" },
          }
        );

        if (response.status === 200) {
          const { results, count } = await response.json();

          if (results) {
            setQueryState("loaded");
            if (!isNaN(count)) setCanNextPage(page < Math.ceil(count / 10));

            setProducts(results);
          }
        }
      } catch (error) {
        setQueryState(error);
      }
  }, [filter, page]);

  const addToCart = (id, product, quantity) => {
    // Get current cart from local storage
    const currentCart = JSON.parse(window.localStorage.getItem("cart")) || {};

    // Add the item to the cart and increase it's quantity
    if (!currentCart[id]) {
      currentCart[id] = product;
      currentCart[id].quantity = quantity;
    } else {
      currentCart[id].quantity += quantity;
    }

    // Update local storage and dispatch a storage event to update the cart
    window.localStorage.setItem("cart", JSON.stringify(currentCart));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="bg-white px-48 py-8 text-gray-700">
      <h2 className="text-6xl font-bold w-3/4 leading-tight mb-8 text-gray-900">
        Get your vehicles and starships with the best!
      </h2>
      <div className="flex justify-between">
        <div>
          <Link
            to={"/?product=starships"}
            className={`${
              filter === "starships"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700"
            } py-2 px-3 text-xs font-bold uppercase rounded-md mr-2`}
          >
            Starships
          </Link>
          <Link
            to={"/?product=vehicles"}
            className={`${
              filter === "vehicles"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700"
            } py-2 px-3 text-xs font-bold uppercase bg-gray-100 text-gray-700 rounded-md`}
          >
            Vehicles
          </Link>
        </div>
        <div>
          <button
            className="disabled:opacity-50 py-2 px-3 text-xs font-bold uppercase bg-gray-100 text-gray-700 rounded-md mr-2"
            disabled={page === 1}
            onClick={() => {
              setPage(page - 1);
            }}
          >
            Previous page
          </button>
          <button
            className="disabled:opacity-50 py-2 px-3 text-xs font-bold uppercase bg-gray-100 text-gray-700 rounded-md"
            disabled={!canNextPage}
            onClick={() => {
              if (canNextPage) setPage(page + 1);
            }}
          >
            Next page
          </button>
        </div>
      </div>
      <hr className="mt-2 mb-4"></hr>
      {/* If query is being loaded, show a loading message. Otherwise, show the products */}
      {queryState === "loading" ? (
        <div className="h-48 flex items-center justify-center">
          Loading items...
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <PreviewItem {...product} addToCart={addToCart}></PreviewItem>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

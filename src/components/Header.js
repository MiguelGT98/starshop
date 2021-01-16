import React from "react";
import { Link } from "react-router-dom";

import Cart from "./Cart";

const Header = () => {
  return (
    <header className="w-full h-16 px-48 flex items-center justify-between border">
      <ul className="flex items-center">
        <li className="p-0 m-0 text-lg font-bold">
          <Link to="/">🌌 Starshop</Link>
        </li>
      </ul>
      <Cart></Cart>
    </header>
  );
};

export default Header;

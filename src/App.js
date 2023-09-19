import Header from "./components/Layout/Header";
import React, { Fragment } from "react";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

import { useSelector } from "react-redux";
function App() {
  const cartIsShown = useSelector((st) => st.ui.showCart);

  return (
    <Fragment>
      {cartIsShown && <Cart />}
      <Header />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;

import React, { useContext } from "react";
import { ProductContext } from "../../context";
import Title from "../Title";
import CartColumns from "./CartColumns";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
import EmptyCart from "./EmptyCart";

function Cart(props) {
  const { cart } = useContext(ProductContext);
  return (
    <section>
      {cart.length > 0 ? (
        <>
          <Title name="your" title="cart" />
          <CartColumns />
          <CartList />
          <CartTotals history={props.history} />
        </>
      ) : (
        <EmptyCart />
      )}
    </section>
  );
}

export default Cart;

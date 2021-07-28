import React, { useContext } from "react";
import { ProductContext } from "../../context";
import CartItem from "./CartItem";

function CartList() {
  const { cart } = useContext(ProductContext);
  //   console.log(cart);
  return (
    <div className="container-fluid">
      {cart.map((item) => {
        return <CartItem key={item.id} item={item} />;
      })}
    </div>
  );
}

export default CartList;

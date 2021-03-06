import React, { useContext } from "react";
import { ProductContext } from "../context";
import Product from "./Product";
import Title from "./Title";

function ProductList() {
  const { products } = useContext(ProductContext);
  console.log(products);
  return (
    <>
      <div className="py-5">
        <div className="container">
          <Title name="our" title="products" />
          <div className="row">
            {products.map((product) => {
              return <Product key={product.id} product={product} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;

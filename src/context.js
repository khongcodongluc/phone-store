import React, { useEffect, useState } from "react";
import { storeProducts, detailProduct } from "./data";

export const ProductContext = React.createContext();
// Provider
// Consumer

function ProductProvider(props) {
  const [products, setProducts] = useState([]);
  const [detailProd, setDetailProd] = useState(detailProduct);
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(detailProduct);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [cartTax, setCartTax] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const setProductsFunc = () => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    setProducts(tempProducts);
  };

  useEffect(() => {
    setProductsFunc();
  }, []);

  useEffect(() => {
    addTotals();
  }, [cart]);

  const getItem = (id) => {
    return products.find((item) => item.id === id);
  };

  const handleDetail = (id) => {
    setDetailProd(getItem(id));
  };

  const addToCart = (id) => {
    let tempProducts = [...products];
    const index = tempProducts.indexOf(getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    setProducts(tempProducts);
    setCart([...cart, product]);
  };

  const openModal = (id) => {
    setModalProduct(getItem(id));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const increment = (id) => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    setCart([...tempCart]);
  };

  const decrement = (id) => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      removeItem(id);
    } else {
      product.total = product.count * product.price;
      setCart([...tempCart]);
    }
  };

  const removeItem = (id) => {
    let tempProducts = [...products];
    let tempCart = [...cart];
    tempCart = tempCart.filter((item) => item.id !== id);
    const prodIndex = getItem(id);
    const index = tempProducts.indexOf(prodIndex);
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;
    setCart([...tempCart]);
    setProducts([...tempProducts]);
  };

  const clearCart = () => {
    setCart([]);
    setProductsFunc();
  };

  const addTotals = () => {
    let subTotal = 0;
    cart.map((item) => (subTotal += item.total));
    console.log(cart);
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    setCartSubTotal(subTotal);
    setCartTax(tax);
    setCartTotal(total);
  };

  return (
    <ProductContext.Provider
      value={{
        products: products,
        detailProd: detailProd,
        cart: cart,
        modalOpen: modalOpen,
        modalProduct: modalProduct,
        cartSubTotal: cartSubTotal,
        cartTax: cartTax,
        cartTotal: cartTotal,
        handleDetail: handleDetail,
        addToCart: addToCart,
        openModal: openModal,
        closeModal: closeModal,
        increment: increment,
        decrement: decrement,
        removeItem: removeItem,
        clearCart: clearCart,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;

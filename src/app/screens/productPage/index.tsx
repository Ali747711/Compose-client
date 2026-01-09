import React, { useEffect } from "react";
import ProductHero from "./ProductHero";
import { useDispatch, useSelector } from "react-redux";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/product.service";
import { setProducts } from "./slice";

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector(retrieveProducts);
  console.log("Products: ", products);
  useEffect(() => {
    console.log("Product Page fetching products --------");
    const productService = new ProductService();
    productService.getAllProducts().then((data) => {
      console.log("Products page, products: ", data);
      dispatch(setProducts(data));
    });
  });
  return (
    <div className="mt-16">
      <ProductHero />
    </div>
  );
};

export default Product;

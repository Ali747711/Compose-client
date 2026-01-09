import React, { useEffect } from "react";
import ProductHero from "./ProductHero";
import { useDispatch, useSelector } from "react-redux";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/product.service";
import { setProducts } from "./slice";
import { useParams } from "react-router-dom";
import type { Product } from "../../../libs/data/types/product";

const Product = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Product Page fetching products --------");
    const productService = new ProductService();
    productService.getAllProducts().then((data) => {
      // console.log("Products page, products: ", data);
      dispatch(setProducts(data));
    });
  }, [id]);

  const products: Product[] = useSelector(retrieveProducts);
  console.log(products);
  const currentProduct: Product = products.find((item) => item?._id === id);
  console.log(currentProduct);
  return (
    <div className="mt-16">
      <ProductHero product={currentProduct} />
    </div>
  );
};

export default Product;

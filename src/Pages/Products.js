import React from "react";
import { useOutletContext } from "react-router-dom";
import CardComponent from "../Components/CardComponent";

const Products = () => {
  const { product, handlePost } = useOutletContext();

  return (
    <div>
      {product.map((item) => (
        <CardComponent key={item._id} product={item} handlePost={handlePost} />
      ))}
    </div>
  );
};

export default Products;

import React, { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { addProduct, getAllProducts, editProduct } from "../Api/api";

const PrivateRoute = () => {
  const [product, setProduct] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const { isVerified, userToken, userInfo, currentItem, setCurrentItem } =
    useOutletContext();

  // Effect hook to fetch products when certain dependencies change
  useEffect(() => {
    const getProducts = async () => {
      const productResponse = await getAllProducts(userToken);
      if (productResponse.success) {
        setProduct(productResponse.data);
      }
    };
    // Check if the user is verified and if there's a token to fetch products
    if (isVerified && userToken) getProducts();
  }, [isVerified, userToken, shouldRefresh]);

  // Handler to create a new product
  const createProduct = async (data) => {
    setShouldRefresh(true);
    console.log(data);
    const createResults = await addProduct(userToken, data);
    setShouldRefresh(false);
    return createResults.success;
  };

  // Handler to post edits to a product
  const handlePost = async (id, data) => {
    setShouldRefresh(true);
    const editResponse = await editProduct(userToken, id, data);
    if (editResponse.success) {
      setShouldRefresh(false);
    }
  };

  return (
    <div>
      <>
        <Outlet
          context={{
            createProduct,
            product,
            setProduct,
            handlePost,
            userToken,
            userInfo,
            currentItem,
          }}
        />
      </>
    </div>
  );
};

export default PrivateRoute;

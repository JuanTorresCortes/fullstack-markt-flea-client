import React, { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { addProduct, getAllProducts, editProduct } from "../Api/api";

const PrivateRoute = () => {
  const [product, setProduct] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const { isVerified, userToken, userInfo, currentItem, setCurrentItem } =
    useOutletContext();

  useEffect(() => {
    const getProducts = async () => {
      const productResponse = await getAllProducts(userToken);
      if (productResponse.success) {
        setProduct(productResponse.data);
      }
    };
    if (isVerified && userToken) getProducts();
  }, [isVerified, userToken, shouldRefresh]);

  const createProduct = async (data) => {
    setShouldRefresh(true);
    console.log(data);
    const createResults = await addProduct(userToken, data);
    setShouldRefresh(false);
    return createResults.success;
  };

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
        <h3>myPage</h3>
        <Outlet
          // don't forget handleDelete, handelEdit
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

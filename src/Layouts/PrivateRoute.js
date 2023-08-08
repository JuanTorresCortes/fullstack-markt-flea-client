import React, { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { addProduct, getAllProducts } from "../Api/api";
import NavPrivateRoute from "../Components/NavPrivateRoute";

const PrivateRoute = () => {
  const [product, setProduct] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const { isVerified, userToken } = useOutletContext();

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
    const createResults = await addProduct(userToken, data);
    setShouldRefresh(false);
    return createResults.success;
  };

  return (
    <div>
      PrivateRoute
      {isVerified && (
        <>
          <NavPrivateRoute />
          <Outlet
            // don't forget handleDelete, handelEdit
            context={{ createProduct, product, setProduct }}
          />
        </>
      )}
    </div>
  );
};

export default PrivateRoute;

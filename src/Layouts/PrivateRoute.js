import React, { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { addProduct, getAllProducts } from "../Api/api";
import NavPrivateRoute from "../Components/NavPrivateRoute";

const PrivateRoute = () => {
  const [product, setProduct] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const { isVerified, userToken, user } = useOutletContext();

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

  const handlePost = (id) => {};

  return (
    <div>
      PrivateRoute
      {isVerified && (
        <>
          <NavPrivateRoute user={user} />
          <Outlet
            // don't forget handleDelete, handelEdit
            context={{ createProduct, product, setProduct, handlePost }}
          />
        </>
      )}
    </div>
  );
};

export default PrivateRoute;

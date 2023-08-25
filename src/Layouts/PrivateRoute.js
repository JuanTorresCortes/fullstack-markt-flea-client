import React, { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { addProduct, getAllProducts, editProduct } from "../Api/api";

const PrivateRoute = () => {
  // State variable to store a list of products
  const [product, setProduct] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const { isVerified, userToken, userInfo, currentItem, setCurrentItem } =
    useOutletContext();

  // useEffect hook to retrieve products once the component mounts and whenever dependencies change
  useEffect(() => {
    // Fetching all products using the provided user token
    const getProducts = async () => {
      const productResponse = await getAllProducts(userToken);
      // If the API call is successful, set the product state with the fetched data
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
    const createResults = await addProduct(userToken, data);
    setShouldRefresh(false);
    return createResults.success;
  };

  // Function to handle edits to an existing product
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

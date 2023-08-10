import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

// // Function to register a new user by making a POST request to the server
const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/users/register`, userData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Function to log in a user by making a POST request to the server
const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/users/login`, userData);
    return response.data;
  } catch (error) {
    //return { success: false, error: error.response.data }; // Return an object with a success field set to false and the error data
    return error.response.data;
  }
};

// Function to validate a user's token by making a GET request to the server
const validateUser = async (userToken) => {
  try {
    const response = await axios.get(`${baseUrl}/users/validate`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const data = response.data;
    // console.log("from validateUser", data);
    return data;
    // return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

const addProduct = async (token, productData) => {
  try {
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }

    const response = await axios.post(
      `${baseUrl}/products/create-product`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // This content type is necessary for sending files
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

const getAllProducts = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/products/all-products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

const editProduct = async (token, id, editInfo) => {
  try {
    const response = await axios.put(
      `${baseUrl}/products/edit-product/${id}`,
      editInfo,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

const getPostedProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/products/get-posted-products`);
    const data = await response.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

const deleteProduct = async (userToken, id) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/products/delete-product/${id}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    const data = await response.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export {
  registerUser,
  loginUser,
  validateUser,
  addProduct,
  getAllProducts,
  editProduct,
  getPostedProducts,
  deleteProduct,
};

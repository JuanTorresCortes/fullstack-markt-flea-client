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

// Adds a new product by making a POST request to the server.
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
          "Content-Type": "multipart/form-data", //=> content type is necessary for sending files
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//Fetches all products from the server.
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
// Edits a product's data based on the provided ID and edit information.
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

//Fetches all products that have been posted.
const getPostedProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/products/get-posted-products`);
    const data = await response.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//  Deletes a product based on the provided ID.
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

// Adds an item to the cart.
const addCartItem = async (token, cartItemData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/cartItems/add-CartItem`,
      cartItemData,
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

// Fetches all items in the cart
const getAllCartItems = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/cartItems/all-cart-items`, {
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

// Deletes a cart item based on the provided ID.
const deleteCartItem = async (token, id) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/cartItems/delete-CartItem/${id}`,
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

// Sends a message from one user to another.
const sendUserMessage = async (senderId, receiverId, content) => {
  try {
    const response = await axios.post(
      `${baseUrl}/messages/send/${senderId}/${receiverId}`,
      { content }
    );

    if (response.data.success) {
      return { success: true, message: response.data.message };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Error sending message:", error);
    return {
      success: false,
      message: "An error occurred while sending the message.",
    };
  }
};

// Fetches all messages for a user.
const getUserMessages = async (userToken) => {
  try {
    const response = await axios.get(`${baseUrl}/messages/user-messages`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

// Deletes a user's message based on the provided user ID and message ID.
const deleteUserMessage = async (userToken, userId, messageId) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/messages/delete-message/${userId}/${messageId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Fetches user info based on the provided user ID.
const getUserInfo = async (token, id) => {
  try {
    const response = await axios.get(`${baseUrl}/users/getUserInfo/${id}`, {
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

// Deletes a user's profile based on the provided user ID.
const deleteProfile = async (token, id) => {
  try {
    const response = await axios.delete(`${baseUrl}/users/delete-user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Add these functions to the existing export statement
export {
  registerUser,
  loginUser,
  validateUser,
  addProduct,
  getAllProducts,
  editProduct,
  getPostedProducts,
  deleteProduct,
  addCartItem,
  getAllCartItems,
  deleteCartItem,
  sendUserMessage,
  getUserMessages,
  deleteUserMessage,
  getUserInfo,
  deleteProfile,
};

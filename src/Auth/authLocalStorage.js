// Explanation:
// This file contains functions to manage user authentication in the local storage of the browser.
// The functions allow setting, getting, and removing the user token from the local storage.

// Key used to store the user token in the local storage
const tokenHeaderKey = process.env.REACT_APP_HEADER_KEY;

// Function to set the user token in the local storage
const setUserToken = (token) => {
  localStorage.setItem(tokenHeaderKey, JSON.stringify(token));
};

// Function to get the user token from the local storage
const getUserToken = () => {
  const token = localStorage.getItem(tokenHeaderKey);
  return JSON.parse(token);
};

// Function to remove the user token from the local storage class using the removeItem() method
const removeUserToken = () => {
  localStorage.removeItem(tokenHeaderKey);
  return true;
};

export { setUserToken, getUserToken, removeUserToken };

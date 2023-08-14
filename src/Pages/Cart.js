import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useOutletContext, useNavigate } from "react-router-dom";
import { getAllCartItems, deleteCartItem } from "../Api/api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { userToken } = useOutletContext();
  const navigate = useNavigate();

  const handleMakeOffer = (item) => {
    // Handle making an offer logic here
    console.log("Making offer for:", item);
  };

  const handleDelete = async (item) => {
    try {
      // Call the deleteCartItem API method
      const response = await deleteCartItem(userToken, item._id);

      if (response.success) {
        // If the deletion was successful, filter out the deleted item from the cartItems array
        const updatedCartItems = cartItems.filter(
          (cartItem) => cartItem._id !== item._id
        );
        setCartItems(updatedCartItems);
      } else {
        // Handle the error here if needed
        console.error("Error deleting the item:", response.error);
      }
    } catch (error) {
      // Handle any other errors that may occur during the deletion
      console.error("An error occurred while deleting the item:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCartItems(userToken);
      if (data.success) {
        setCartItems(data.data); // Assuming the items are in the data property
      }
    };
    fetchData();
  }, [userToken]);

  return (
    <div style={{ marginRight: "px" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Cost</th>
            <th>Actions</th> {/* Header for actions column */}
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.image} alt={item.productName} width="50" />
              </td>
              <td>{item.productName}</td>
              <td>{item.description}</td>
              <td>${item.cost}</td>
              <td>
                <Button
                  style={{ marginRight: "10px" }}
                  onClick={() => handleMakeOffer(item)}
                >
                  Make Offer
                </Button>
                <Button variant="danger" onClick={() => handleDelete(item)}>
                  Delete
                </Button>
              </td>{" "}
              {/* Buttons column */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Cart;

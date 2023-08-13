import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { getAllCartItems } from "../Api/api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { userToken } = useOutletContext(); // Assuming userToken is available in context

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCartItems(userToken);
      if (data.success) {
        setCartItems(data.data); // Assuming the items are in the data property
      }
    };
    console.log(cartItems);
    fetchData();
  }, [userToken, cartItems]);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Cost</th>
            {/* Add more columns as needed */}
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
              {/* Render more columns as needed */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Cart;

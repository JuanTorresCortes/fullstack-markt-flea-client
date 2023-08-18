// import React, { useEffect, useState } from "react";
// import { Table, Button, Modal, Form, Dropdown } from "react-bootstrap";
// import { useOutletContext, useNavigate } from "react-router-dom";
// import { getAllCartItems, deleteCartItem, sendUserMessage } from "../Api/api";

// const Cart = () => {
//   const { userToken, userInfo } = useOutletContext();
//   const [cartItems, setCartItems] = useState([]);

//   const [showModal, setShowModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [message, setMessage] = useState("");
//   const [productName, setProductName] = useState("");
//   const navigate = useNavigate();

//   const handleMakeOffer = (item) => {
//     setSelectedItem(item);
//     if (selectedItem) {
//       setProductName(selectedItem.productName);
//     }
//     setShowModal(true);
//   };

//   const handleSendOffer = async () => {
//     if (selectedItem) {
//       const senderId = userInfo._id;
//       const receiverId = selectedItem.productCurrentOwner;
//       const response = await sendUserMessage(senderId, receiverId, message);

//       if (response.success) {
//         console.log("Message sent successfully:", response.message);
//       } else {
//         console.error("Error sending message:", response.message);
//       }

//       //navigate("/messageDashboard");
//       setShowModal(false);
//     }
//   };

//   const handleDelete = async (item) => {
//     try {
//       const response = await deleteCartItem(userToken, item._id);

//       if (response.success) {
//         const updatedCartItems = cartItems.filter(
//           (cartItem) => cartItem._id !== item._id
//         );
//         setCartItems(updatedCartItems);
//       } else {
//         console.error("Error deleting the item:", response.error);
//       }
//     } catch (error) {
//       console.error("An error occurred while deleting the item:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getAllCartItems(userToken);
//       if (data.success) {
//         setCartItems(data.data);
//       }
//     };
//     fetchData();
//   }, [userToken]);

//   return (
//     <div style={{ margin: "5rem" }}>
//       <h2>Cart Items</h2>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>Product Name</th>
//             <th>Description</th>
//             <th>Cost</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cartItems.map((item) => (
//             <tr key={item._id}>
//               <td>
//                 <img src={item.image} alt={item.productName} width="50" />
//               </td>
//               <td>{item.productName}</td>
//               <td>{item.description}</td>
//               <td>${item.cost}</td>
//               <td>
//                 <Button
//                   style={{ marginRight: "10px" }}
//                   onClick={() => handleMakeOffer(item)}
//                 >
//                   Make Offer
//                 </Button>
//                 <Button variant="danger" onClick={() => handleDelete(item)}>
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Make Offer</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="exampleForm.ControlTextarea1">
//               <Form.Label>Message</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//               />
//             </Form.Group>
//             <Dropdown>
//               <Dropdown.Toggle variant="success" id="dropdown-basic">
//                 Select a response
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 <Dropdown.Item
//                   onClick={() =>
//                     setMessage(`Hello, I'm ${userInfo.name} and I'm interested in
//                   purchasing ${selectedItem.productName} if it's still available.
//                    Could you please provide details on its condition, methods of delivery,
//                    and accepted payment options? You can reach me at ${userInfo.email}.`)
//                   }
//                 >
//                   Hello, I'm {userInfo.name} and I'm interested in purchasing
//                   {productName} if it's still available. Could you please
//                   provide details on its condition, methods of delivery, and
//                   accepted payment options? You can reach me at {userInfo.email}
//                   .
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSendOffer}>
//             Send Offer
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useOutletContext, useNavigate } from "react-router-dom";
import { getAllCartItems, deleteCartItem, sendUserMessage } from "../Api/api";

const Cart = () => {
  const { userToken, userInfo } = useOutletContext();
  const [cartItems, setCartItems] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleMakeOffer = (item) => {
    setSelectedItem(item);
    setShowModal(true);

    const genericMessage = `Hello, I'm ${userInfo.name} and I'm interested in
    purchasing ${item.productName} if it's still available.
    Could you please provide details on its condition, methods of delivery,
    and accepted payment options? You can reach me at ${userInfo.email}.`;
    setMessage(genericMessage);
  };

  const handleSendOffer = async () => {
    if (selectedItem) {
      const senderId = userInfo._id;
      const receiverId = selectedItem.productCurrentOwner;
      const response = await sendUserMessage(senderId, receiverId, message);

      if (response.success) {
        console.log("Message sent successfully:", response.message);
      } else {
        console.error("Error sending message:", response.message);
      }

      setShowModal(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      const response = await deleteCartItem(userToken, item._id);

      if (response.success) {
        const updatedCartItems = cartItems.filter(
          (cartItem) => cartItem._id !== item._id
        );
        setCartItems(updatedCartItems);
      } else {
        console.error("Error deleting the item:", response.error);
      }
    } catch (error) {
      console.error("An error occurred while deleting the item:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCartItems(userToken);
      if (data.success) {
        setCartItems(data.data);
      }
    };
    fetchData();
  }, [userToken]);

  return (
    <div style={{ margin: "5rem" }}>
      <h2>Cart Items</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Cost</th>
            <th>Actions</th>
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
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Make Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSendOffer}>
            Send Offer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;

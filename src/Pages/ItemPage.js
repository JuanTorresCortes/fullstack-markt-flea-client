import React, { useState } from "react"; // Import useState
import { useNavigate, useOutletContext } from "react-router-dom";
import { Card, Button, Container, Row, Col, Alert } from "react-bootstrap"; // Import Alert
import { Link } from "react-router-dom";
import { addCartItem } from "../Api/api";

const ItemPage = () => {
  const { userInfo, currentItem, userToken } = useOutletContext();
  const navigate = useNavigate();

  // State variable for storing the error message
  const [error, setError] = useState(null);

  const handleCartButton = async () => {
    const data = {
      owner: userInfo._id,
      productCurrentOwner: currentItem.owner,
      image: currentItem.image,
      productName: currentItem.productName,
      description: currentItem.description,
      cost: currentItem.cost,
    };
    const createResults = await addCartItem(userToken, data);

    if (createResults.success) {
      navigate("/cart");
    } else {
      // Set the error state with the message returned from the server
      setError(createResults.message);
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row>
        <Col md="auto">
          {/* Display an alert if there's an error */}
          {error && <Alert variant="danger">{error}</Alert>}
          <Card
            style={{
              width: "30rem",
              border: "12px solid black", // Black border
              boxShadow: "0 8px 16px rgba(0,0,0,0.5)", // Enhanced box shadow
            }}
          >
            <Card.Img
              variant="top"
              src={currentItem.image}
              alt={currentItem.productName}
            />
            <Card.Body>
              <Card.Title>{currentItem.productName}</Card.Title>
              <Card.Text>{currentItem.description}</Card.Text>
              <h5>Cost: ${currentItem.cost}</h5>{" "}
              <small>qty{currentItem.quantity}</small>{" "}
              <Button
                variant="primary"
                className="mr-2"
                onClick={handleCartButton}
              >
                Add to Cart
              </Button>
              <Link to="/">
                <Button variant="primary" className="ml-2">
                  Back Home
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemPage;

// userInfo =>
// email: "giana@gmail.com"
// name:"giana torres"
// success: true
//_id: "6f19992f-fcd8-4b93-90d4-498241de48ae"

// currentItem =>
// cost: 25
// description: "Books i will never read "
// image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAA
// owner: "6f19992f-fcd8-4b93-90d4-498241de48ae"
// productId: "25bfb344-68f7-4f24-9553-edaeac4f7f73"
// productName: "books"

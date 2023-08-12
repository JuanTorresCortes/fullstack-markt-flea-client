import React from "react";
import { useOutletContext } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import if you want to link the button to the home page

const ItemPage = () => {
  const { userInfo, currentItem } = useOutletContext();

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row>
        <Col md="auto">
          <Card style={{ width: "30rem" }}>
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
              <Button variant="primary" className="mr-2">
                Add to Cart
              </Button>
              {/* Use Link to route to the home page, or replace with a custom function */}
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

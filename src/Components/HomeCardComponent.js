import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomeCardComponent = ({ product, isVerified }) => {
  const navigate = useNavigate();

  const imageBase64 =
    product.image && product.image.data
      ? `data:image/jpeg;base64,${btoa(
          String.fromCharCode(...new Uint8Array(product.image.data))
        )}`
      : "";
  const handleBuyButton = () => {
    if (!isVerified) {
      navigate("/login");
    }
  };
  return (
    <Card style={{ width: "18rem", height: "100%" }}>
      <Card.Img
        variant="top"
        src={imageBase64}
        alt={product.productName}
        style={{ height: "150px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{product.productName}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>Cost: ${product.cost}</Card.Text>
        <Card.Text>Quantity: {product.quantity}</Card.Text>
        <Card.Text>Category: {product.categories}</Card.Text>
      </Card.Body>
      <Button variant={"success"} onClick={handleBuyButton}>
        buy
      </Button>
      <Button variant={"success"}>add to wishlist</Button>
    </Card>
  );
};

export default HomeCardComponent;

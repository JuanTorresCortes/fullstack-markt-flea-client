import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CardComponent = ({ product, handlePost }) => {
  const navigate = useNavigate();

  const imageBase64 =
    product.image && product.image.data
      ? `data:image/jpeg;base64,${btoa(
          String.fromCharCode(...new Uint8Array(product.image.data))
        )}`
      : "";

  const post = () => {
    handlePost(product._id);
    navigate("/");
  };
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imageBase64} alt={product.productName} />
      <Card.Body>
        <Card.Title>{product.productName}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>Cost: ${product.cost}</Card.Text>
        <Card.Text>Quantity: {product.quantity}</Card.Text>
        <Card.Text>Category: {product.categories}</Card.Text>
      </Card.Body>
      <Button variant="success" onClick={post}>
        Post
      </Button>
    </Card>
  );
};
export default CardComponent;

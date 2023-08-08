import React from "react";
import { Card } from "react-bootstrap";

const CardComponent = ({ product }) => {
  console.log(product.image.data);
  const imageBase64 = product.image
    ? `data:image/jpeg;base64,${toBase64(product.image.data)}`
    : "";
  console.log(imageBase64);
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
    </Card>
  );
};

function toBase64(arr) {
  return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ""));
}

export default CardComponent;

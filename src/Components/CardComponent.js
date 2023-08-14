import React, { useState, useEffect } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../Api/api";

const CardComponent = ({ product, handlePost, userToken }) => {
  // Initialize the state as false
  const [isPosted, setIsPosted] = useState(product.isPosted);

  const navigate = useNavigate();

  const imageBase64 =
    product.image && product.image.data
      ? `data:image/jpeg;base64,${btoa(
          String.fromCharCode(...new Uint8Array(product.image.data))
        )}`
      : "";

  const post = () => {
    // Toggle the local isPosted state
    setIsPosted(!isPosted);
    const data = {
      isPosted: !isPosted,
    };
    // Call the handlePost function with the new value
    handlePost(product._id, data);
    navigate("/");
  };

  const handleDelete = async () => {
    deleteProduct(userToken, product._id);
    navigate("/");
  };

  return (
    <Card style={{ width: "18rem", height: "100%" }}>
      {/* {isCurrentUser && <Badge variant="primary">Posted by Me</Badge>} */}

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
      <Button variant={isPosted ? "warning" : "success"} onClick={post}>
        {product.isPosted ? "Un-post" : "Post"}
      </Button>
      <Button variant={"danger"} onClick={handleDelete}>
        delete
      </Button>
    </Card>
  );
};

export default CardComponent;

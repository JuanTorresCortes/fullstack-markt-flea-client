import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteProduct, editProduct } from "../Api/api";

const CardComponent = ({ product, handlePost, userToken }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPosted, setIsPosted] = useState(product.isPosted);
  const [editedProduct, setEditedProduct] = useState(product);
  const navigate = useNavigate();

  const imageBase64 =
    product.image && product.image.data
      ? `data:image/jpeg;base64,${btoa(
          String.fromCharCode(...new Uint8Array(product.image.data))
        )}`
      : "";

  const post = () => {
    setIsPosted(!isPosted);
    const data = {
      isPosted: !isPosted,
    };
    handlePost(product._id, data);
    navigate("/");
  };

  const handleEditChange = (event) => {
    setEditedProduct({
      ...editedProduct,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditSubmit = async () => {
    const response = await editProduct(userToken, product._id, editedProduct);
    if (response.success) {
      setIsEditing(false);
      navigate("/products");
    } else {
      console.error("Error updating the product:", response.error);
    }
  };

  const handleDelete = async () => {
    deleteProduct(userToken, product._id);
    navigate("/");
  };

  return (
    <Card style={{ width: "18rem", height: "100%" }}>
      {isEditing ? (
        <Form>
          <Form.Group>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              value={editedProduct.productName}
              onChange={handleEditChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={editedProduct.description}
              onChange={handleEditChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Cost</Form.Label>
            <Form.Control
              type="number"
              name="cost"
              value={editedProduct.cost}
              onChange={handleEditChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={editedProduct.quantity}
              onChange={handleEditChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="categories"
              value={editedProduct.categories}
              onChange={handleEditChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleEditSubmit}>
            Submit
          </Button>
          <Button variant="info" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </Form>
      ) : (
        <>
          <Card.Img
            variant="top"
            src={imageBase64}
            alt={product.productName}
            style={{ height: "150px", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title>{editedProduct.productName}</Card.Title>
            <Card.Text>{editedProduct.description}</Card.Text>
            <Card.Text>Cost: ${editedProduct.cost}</Card.Text>
            <Card.Text>Quantity: {editedProduct.quantity}</Card.Text>
            <Card.Text>Category: {editedProduct.categories}</Card.Text>
          </Card.Body>
          <Button variant={isPosted ? "warning" : "success"} onClick={post}>
            {product.isPosted ? "Un-post" : "Post"}
          </Button>
          <Button variant={"danger"} onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="info" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </>
      )}
    </Card>
  );
};

export default CardComponent;

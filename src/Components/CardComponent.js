import React, { useState } from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteProduct, editProduct } from "../Api/api";
//@fortawesome/react-fontawesome package to import and use Font Awesome icons as React components.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const CardComponent = ({ product, handlePost, userToken }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPosted, setIsPosted] = useState(product.isPosted);
  const [editedProduct, setEditedProduct] = useState(product);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Convert image data to Base64 format
  const imageBase64 =
    product.image && product.image.data
      ? `data:image/jpeg;base64,${btoa(
          String.fromCharCode(...new Uint8Array(product.image.data))
        )}`
      : "";

  // Toggle the posted status of a product
  const post = () => {
    setIsPosted(!isPosted);
    const data = {
      isPosted: !isPosted,
    };
    handlePost(product._id, data);
    navigate("/");
  };

  // Handle changes made during editing
  const handleEditChange = (event) => {
    setEditedProduct({
      ...editedProduct,
      [event.target.name]: event.target.value,
    });
  };

  // Submit edits to the backend
  const handleEditSubmit = async () => {
    const response = await editProduct(userToken, product._id, editedProduct);
    if (response.success) {
      setIsEditing(false);
      navigate("/products");
    } else {
      console.error("Error updating the product:", response.error);
    }
  };

  // Show confirmation modal for deletion
  const handleDeleteConfirmation = () => {
    setShowModal(true);
  };

  // Confirm product deletion
  const handleDeleteConfirmed = async () => {
    deleteProduct(userToken, product._id);
    navigate("/");
  };

  return (
    <>
      {/* Deletion confirmation modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            <FontAwesomeIcon icon={faTimes} /> Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmed}>
            <FontAwesomeIcon icon={faCheck} /> Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <Card
        style={{
          width: "18rem",
          height: "100%",
          marginTop: "2rem",
          border: "solid 3px purple",
        }}
      >
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

            <Button
              variant={isPosted ? "outline-warning" : "outline-success"}
              onClick={post}
            >
              {product.isPosted ? "Un-post" : "Post"}
            </Button>

            <Button
              variant="outline-primary"
              onClick={() => setIsEditing(true)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>

            <Button variant="outline-danger" onClick={handleDeleteConfirmation}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </>
        )}
      </Card>
    </>
  );
};

export default CardComponent;

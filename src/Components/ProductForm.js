import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const ProductForm = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categories, setCategories] = useState("miscellaneous");
  const [image, setImage] = useState(null);

  const { createProduct } = useOutletContext();
  const navigate = useNavigate();

  // Constructing the data object based on form values
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const data = {
      productName,
      description,
      cost,
      quantity,
      categories,
      image,
    };

    // Calling the 'createProduct' function to create a new product
    const result = await createProduct(data);

    if (result) {
      setProductName("");
      setDescription("");
      setCost("");
      setQuantity("");
      setCategories("miscellaneous");
      setImage(null);
      navigate("/products"); // Redirect to the products page
    }
  };

  return (
    <div className="form-container">
      <h1>Add Item</h1>
      <Form onSubmit={handleOnSubmit} className="form">
        <Form.Group className="mb-3" controlId="productName">
          <Form.Label>Product Name:</Form.Label>
          <Form.Control
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="cost">
          <Form.Label>Cost:</Form.Label>
          <Form.Control
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="quantity">
          <Form.Label>Quantity:</Form.Label>
          <Form.Control
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="categories">
          <Form.Label>Categories:</Form.Label>
          <Form.Control
            as="select"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          >
            <option value="books">Books</option>
            <option value="health & beauty">Health & Beauty</option>
            <option value="electronics">Electronics</option>
            <option value="home & kitchen">Home & Kitchen</option>
            <option value="clothing & accessories">
              Clothing & Accessories
            </option>
            <option value="tools">Tools</option>
            <option value="sports & outdoors">Sports & Outdoors</option>
            <option value="movies">Movies</option>
            <option value="toys & games">Toys & Games</option>
            <option value="pets & pet supplies">Pets & Pet Supplies</option>
            <option value="vehicles">Vehicles</option>
            <option value="miscellaneous">Miscellaneous</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image:</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Create Product
        </Button>
      </Form>
    </div>
  );
};

export default ProductForm;

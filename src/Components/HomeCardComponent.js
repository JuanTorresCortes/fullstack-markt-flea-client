import React, { useState, useEffect } from "react";
import { Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomeCardComponent = ({
  product,
  isVerified,
  setCurrentItem,
  userInfo,
}) => {
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const navigate = useNavigate();

  // Effect hook to check if the product owner is the current user
  useEffect(() => {
    if (product.owner === userInfo._id) {
      setIsCurrentUser(true);
    }
  }, [product, userInfo]);

  // Convert image data to Base64 format
  const imageBase64 =
    product.image && product.image.data
      ? `data:image/jpeg;base64,${btoa(
          String.fromCharCode(...new Uint8Array(product.image.data))
        )}`
      : "";

  // Event handler for the "buy" button
  const handleImageClick = () => {
    // If the user is not verified, navigate them to the login page
    if (!isVerified) {
      navigate("/login");
    } else if (isVerified) {
      // If the user is verified, set the current item and navigate to its details page
      const data = {
        productId: product._id,
        owner: product.owner,
        productName: product.productName,
        description: product.description,
        cost: product.cost,
        quantity: product.quantity,
        image: imageBase64,
      };

      setCurrentItem(data);
      navigate("/ItemPage");
    }
  };

  return (
    <Card style={{ width: "18rem", height: "100%" }}>
      {isCurrentUser && (
        <Badge variant="primary">Posted by {userInfo.name}</Badge>
      )}

      <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
        <Card.Img
          variant="top"
          src={imageBase64}
          alt={product.productName}
          style={{ height: "150px", objectFit: "cover" }}
        />
      </div>
    </Card>
  );
};

export default HomeCardComponent;

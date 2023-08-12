import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomeCardComponent = ({ product, isVerified, setCurrentItem }) => {
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
    } else if (isVerified) {
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
      navigate("ItemPage");
    }
  };

  return (
    <Card style={{ width: "18rem", height: "100%" }}>
      <div onClick={handleBuyButton} style={{ cursor: "pointer" }}>
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

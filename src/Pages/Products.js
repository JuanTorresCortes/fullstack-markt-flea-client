import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useOutletContext } from "react-router-dom"; // Make sure this is your custom context
import CardComponent from "../Components/CardComponent";

const Products = () => {
  const { product, handlePost, userToken, userInfo, setShouldRefresh } =
    useOutletContext(); // Assuming userInfo contains user details
  console.log("Current User ID:", userInfo._id);

  return (
    <Container>
      <Row>
        {product.map((item) => (
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            style={{ margin: "15px" }}
            key={item._id}
          >
            <CardComponent
              product={item}
              handlePost={handlePost}
              userToken={userToken}
              isCurrentUser={item.owner === userInfo._id} // Compare owner with current user's ID
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useOutletContext } from "react-router-dom"; // Make sure this is your custom context
import CardComponent from "../Components/CardComponent";

const Products = () => {
  const { product, handlePost, userToken, userInfo, setShouldRefresh } =
    useOutletContext();

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
              userInfo={userInfo}
              handlePost={handlePost}
              userToken={userToken}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;

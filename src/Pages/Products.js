import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import CardComponent from "../Components/CardComponent";

const Products = () => {
  const { product, handlePost, userToken, setShouldRefresh } =
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

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getPostedProducts } from "../Api/api";
import HomeCardComponent from "../Components/HomeCardComponent";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { isVerified } = useOutletContext();
  const [postedProduct, setPostedProduct] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const productResponse = await getPostedProducts();
      if (productResponse.success) {
        setPostedProduct([...productResponse.products]); // Change this line according to the actual structure
      }
    };
    getProducts();
  }, [shouldRefresh]);

  return (
    <Container>
      <Row>
        {postedProduct &&
          postedProduct.map((item) => (
            <Col
              xs={12}
              sm={6}
              md={4}
              lg={3}
              style={{ margin: "15px" }}
              key={item._id}
            >
              <HomeCardComponent product={item} isVerified={isVerified} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Home;

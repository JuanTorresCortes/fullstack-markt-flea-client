import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getPostedProducts } from "../Api/api";
import HomeCardComponent from "../Components/HomeCardComponent";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const {
    isVerified,
    setCurrentItem,
    userInfo,
    currentItem,
    postedProduct,
    setPostedProduct,
  } = useOutletContext();
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const productResponse = await getPostedProducts();
      if (productResponse.success) {
        setPostedProduct([...productResponse.products]);
      }
    };
    getProducts();
  }, [shouldRefresh]);

  return (
    <Container style={{ marginTop: "1rem" }}>
      <Row className="justify-content-center">
        {postedProduct &&
          postedProduct.map((item) => (
            <Col xs={12} sm={6} md={4} lg={3} key={item._id} className="mb-4">
              <Card className="card-container">
                {" "}
                {/* Applying the CSS class */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <HomeCardComponent
                    product={item}
                    isVerified={isVerified}
                    setCurrentItem={setCurrentItem}
                    currentItem={currentItem}
                    userInfo={userInfo}
                  />
                </div>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Home;

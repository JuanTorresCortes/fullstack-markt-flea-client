import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import HomeCardComponent from "../Components/HomeCardComponent";
import { useOutletContext, useParams } from "react-router-dom";

const SearchCategory = () => {
  const {
    postedProduct,
    isVerified,
    setCurrentItem,
    userInfo,
    currentItem,
    setPostedProduct,
  } = useOutletContext();

  const { category } = useParams();
  //console.log("Selected category:", category);

  const filteredProducts = postedProduct.filter(
    (item) =>
      item.categories &&
      item.categories.toLowerCase() === category.toLowerCase()
  );
  //console.log("Posted products:", postedProduct);
  return (
    <Container style={{ marginTop: "65px" }}>
      <Row className="justify-content-center">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
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
          ))
        ) : (
          <p>Sorry, there are no items posted in this category.</p>
        )}
      </Row>
    </Container>
  );
};

export default SearchCategory;

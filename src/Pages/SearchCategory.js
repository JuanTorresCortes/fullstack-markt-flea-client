import { Container, Row, Col, Card } from "react-bootstrap";
import HomeCardComponent from "../Components/HomeCardComponent";
import { useOutletContext, useParams } from "react-router-dom";

const SearchCategory = () => {
  const { postedProduct, isVerified, setCurrentItem, userInfo, currentItem } =
    useOutletContext();

  // Getting the category parameter from the current route using the useParams hook
  const { category } = useParams();

  // Filtering the posted products based on the selected category
  const filteredProducts = postedProduct.filter(
    (item) =>
      item.categories &&
      item.categories.toLowerCase() === category.toLowerCase()
  );

  return (
    <Container style={{ marginTop: "65px" }}>
      <Row className="justify-content-center">
        {/* Checking if there are any products in the filtered category */}
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Col xs={12} sm={6} md={4} lg={3} key={item._id} className="mb-4">
              {/* Card for each product */}
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
          // If there are no products in the category, show a message to the user
          <p>Sorry, there are no items posted in this category.</p>
        )}
      </Row>
    </Container>
  );
};

export default SearchCategory;

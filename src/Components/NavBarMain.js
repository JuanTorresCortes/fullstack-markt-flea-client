import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Badge,
} from "react-bootstrap";
import { removeUserToken } from "../Auth/authLocalStorage";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faHeartbeat,
  faLaptop,
  faHome,
  faTshirt,
  faWrench,
  faFutbol,
  faFilm,
  faGamepad,
  faPaw,
  faAsterisk,
  faPlus,
  faList,
  faShoppingCart,
  faEnvelope,
  faUser,
  faSignOutAlt,
  faCar,
} from "@fortawesome/free-solid-svg-icons";

const NavBarMain = ({
  isVerified,
  user,
  setShouldRefresh,
  setUser,
  setIsVerified,
  hasNewMessage,
}) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  const handleLogout = async () => {
    setShouldRefresh(true);

    // Remove the user token from the local storage
    const resultLogout = await removeUserToken();
    if (resultLogout) {
      // Set the user authentication status to false and reset user details
      setShouldRefresh(false);
      setUser(null);
      setIsVerified(false);
      navigate("/");
    }
  };

  const handleCategoryClick = (category) => {
    // Handle the category selection and pass the value down to the Search page
    setCategory(category);
    navigate(`/search-category/${category}`);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/">Market Flea</Navbar.Brand>
        {isVerified && (
          <Navbar.Collapse className="justify-content-start">
            <Navbar.Text>
              Signed in as: <a href="/products">{user}</a>
            </Navbar.Text>
          </Navbar.Collapse>
        )}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {!isVerified ? (
              <React.Fragment>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Nav.Link href="/">
                  <FontAwesomeIcon icon={faHome} /> Home
                </Nav.Link>
                <Nav.Link href="/products/add-product">
                  <FontAwesomeIcon icon={faPlus} /> Add Product
                </Nav.Link>
                <Nav.Link href="/products">
                  <FontAwesomeIcon icon={faList} /> myProducts
                </Nav.Link>
                <Nav.Link href="/cart">
                  <FontAwesomeIcon icon={faShoppingCart} /> cart
                </Nav.Link>
                <Nav.Link href="/messageDashboard">
                  <FontAwesomeIcon icon={faEnvelope} /> messages{" "}
                  {hasNewMessage && (
                    <Badge pill bg="danger">
                      New
                    </Badge>
                  )}
                </Nav.Link>
                <Nav.Link href="/profile">
                  <FontAwesomeIcon icon={faUser} /> myProfile
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </Nav.Link>
              </React.Fragment>
            )}
          </Nav>

          <NavDropdown
            title="Search Categories"
            id="navbarScrollingDropdown"
            style={{ marginRight: "80px" }}
          >
            <NavDropdown.Item onClick={() => handleCategoryClick("books")}>
              <FontAwesomeIcon icon={faBook} /> Books
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => handleCategoryClick("health & beauty")}
            >
              <FontAwesomeIcon icon={faHeartbeat} /> Health & Beauty
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => handleCategoryClick("electronics")}
            >
              <FontAwesomeIcon icon={faLaptop} /> Electronics
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => handleCategoryClick("home & kitchen")}
            >
              <FontAwesomeIcon icon={faHome} /> Home & Kitchen
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => handleCategoryClick("clothing & accessories")}
            >
              <FontAwesomeIcon icon={faTshirt} /> Clothing & Accessories
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleCategoryClick("tools")}>
              <FontAwesomeIcon icon={faWrench} /> Tools
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => handleCategoryClick("sports & outdoors")}
            >
              <FontAwesomeIcon icon={faFutbol} /> Sports & Outdoors
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleCategoryClick("movies")}>
              <FontAwesomeIcon icon={faFilm} /> Movies
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => handleCategoryClick("toys & games")}
            >
              <FontAwesomeIcon icon={faGamepad} /> Toys & Games
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => handleCategoryClick("pets & pet supplies")}
            >
              <FontAwesomeIcon icon={faPaw} /> Pets & Pet Supplies
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleCategoryClick("vehicles")}>
              <FontAwesomeIcon icon={faCar} /> Vehicles
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => handleCategoryClick("miscellaneous")}
            >
              <FontAwesomeIcon icon={faAsterisk} /> Miscellaneous
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarMain;

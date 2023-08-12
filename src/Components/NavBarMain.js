import React from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { removeUserToken } from "../Auth/authLocalStorage";
import { useNavigate } from "react-router-dom";

const NavBarMain = ({
  isVerified,
  user,
  setShouldRefresh,
  setUser,
  setIsVerified,
}) => {
  const navigate = useNavigate();
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

  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/">Market Flea</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {/* this is a nav link AO */}

            {!isVerified ? (
              <React.Fragment>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/products">myPage</Nav.Link>
                <Nav.Link href="/products/add-product">Add Product</Nav.Link>

                <NavDropdown title="my profile" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">
                    my wish list
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    my transactions
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action3">my post</NavDropdown.Item>
                  <NavDropdown.Item href="#action3">
                    my messages
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    my profile
                  </NavDropdown.Item>
                </NavDropdown>

                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                    Signed in as: <a href="/products">{user}</a>
                  </Navbar.Text>
                </Navbar.Collapse>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </React.Fragment>
            )}
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarMain;

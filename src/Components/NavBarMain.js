import React from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { removeUserToken } from "../Auth/authLocalStorage";

const NavBarMain = ({
  isVerified,
  user,
  setShouldRefresh,
  setUser,
  setIsVerified,
}) => {
  const handleLogout = async () => {
    setShouldRefresh(true);

    // Remove the user token from the local storage
    const resultLogout = await removeUserToken();
    if (resultLogout) {
      // Set the user authentication status to false and reset user details
      setShouldRefresh(false);
      setUser(null);
      setIsVerified(false);
      console.log("Logged out");
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Market Flea</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {/* this is a nav link AO */}
            <Nav.Link href="/">Home</Nav.Link>
            {!isVerified ? (
              <React.Fragment>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <span>{user}</span>
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

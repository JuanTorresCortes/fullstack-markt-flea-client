import React from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";

const NavBarMain = () => {
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
            <Nav.Link href="/login">login</Nav.Link>
            <Nav.Link href="register">Register</Nav.Link>

            {/* this is a drop down  */}
            <NavDropdown title="my profile" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">my wish list</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                my transactions
              </NavDropdown.Item>
              <NavDropdown.Item href="#action3">my post</NavDropdown.Item>
              <NavDropdown.Item href="#action3">my messages</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">my profile</NavDropdown.Item>
            </NavDropdown>

            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: <a href="/">Juan Torres</a>
              </Navbar.Text>
            </Navbar.Collapse>
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

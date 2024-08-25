// src/component/Nab.jsx
import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../ContextAPI";

export default class Nab extends Component {
  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/">
            React Car Shop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Products
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/cart"
                style={{ color: "mediumspringgreen" }}
              >
                <ProductConsumer>
                  {(value) => `My Cart (${value.Cart.length})`}
                </ProductConsumer>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

/* eslint-disable react/jsx-key */
import React, { Component } from "react";
import { ProductConsumer } from "../ContextAPI";
import { Button, Col, Container, Row } from "react-bootstrap";

export default class Cart extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {(value) => {
            // Check if there are items in the cart
            if (value.Cart.length > 0) {
              return (
                <div>
                  <div>
                    <h1>Your Cart</h1>
                  </div>
                  <Container fluid className="text-center">
                    <Row>
                      <Col xs={10} lg={2}>
                        <strong>Car</strong>
                      </Col>
                      <Col xs={10} lg={2}>
                        <strong>Name of Car</strong>
                      </Col>
                      <Col xs={10} lg={2}>
                        <strong>Price</strong>
                      </Col>
                      <Col xs={10} lg={2}>
                        <strong>Quantity</strong>
                      </Col>
                      <Col xs={10} lg={2}>
                        <strong>Remove</strong>
                      </Col>
                      <Col xs={10} lg={2}>
                        <strong>Total</strong>
                      </Col>
                    </Row>
                  </Container>
                  {/* Map through the cart items and display each */}
                  {value.Cart.map((cartData) => {
                    return (
                      <Container fluid className="text-center my-2">
                        <Row className="align-items-center">
                          <Col xs={10} lg={2}>
                            <img
                              style={{ width: "6rem", height: "4rem" }}
                              src={cartData.image}
                              className="img-fluid"
                              alt={cartData.name}
                            />
                          </Col>
                          <Col xs={10} lg={2}>
                            {cartData.title}
                          </Col>
                          <Col xs={10} lg={2}>
                            {cartData.price}
                          </Col>
                          <Col
                            xs={10}
                            lg={2}
                            className="d-flex justify-content-center"
                          >
                            <Button
                              variant="light"
                              size="sm"
                              onClick={() => value.decrement(cartData.id)}
                              className="me-2"
                            >
                              -
                            </Button>
                            <span>{cartData.count}</span>
                            <Button
                              variant="light"
                              size="sm"
                              onClick={() => value.increment(cartData.id)}
                              className="ms-2"
                            >
                              +
                            </Button>
                          </Col>
                          <Col xs={10} lg={2}>
                            <Button
                              variant="danger"
                              onClick={() => value.removeItem(cartData.id)}
                              size="sm"
                            >
                              Remove
                            </Button>
                          </Col>
                          <Col xs={10} lg={2}>
                            {cartData.total}
                          </Col>
                        </Row>
                      </Container>
                    );
                  })}
                </div>
              );
            } else {
              return (
                <div>
                  <h3>
                    Currently your cart is{" "}
                    <span style={{ color: "red" }}>Empty</span>
                  </h3>
                </div>
              );
            }
          }}
        </ProductConsumer>
      </section>
    );
  }
}

/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from "react";
import { ProductConsumer } from "../ContextAPI";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const { id, title, image, price, inCart, info } = value.detailProduct;
          return (
            <div className="container">
              <div className="col-10 mx-auto text-center">
                <h1>your car Details</h1>
              </div>
              <div className="row">
                <div className="col-4 mx-auto col-md-4">
                  <img src={image} className="img-fluid" alt="product" />
                </div>
              </div>
              <div className="row">
                <div className="col-4 mx-auto col-md-4">
                  <h4>model: {title}</h4>
                  <h5>
                    <strong>
                      price : <span></span>
                      {price}
                    </strong>
                  </h5>
                  <p>some information about this product :</p>
                  <p className="text-muted">{info}</p>
                  <div>
                    <Link to="/">Back to product page</Link>
                    <Button
                      size="sm"
                      disabled={inCart}
                      onClick={() => {
                        value.addToCart(id);
                      }}
                      variant="secondary"
                    >
                      {inCart === true ? (
                        <span>In Cart</span>
                      ) : (
                        <span>Add to Cart</span>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}

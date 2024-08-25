/* eslint-disable react/prop-types */
import React, { Component, createContext } from "react";
import { dataProducts, prodInDetails } from "./AppData";

// Create a new context
const ProductContext = createContext();

class ProductProvider extends Component {
  state = {
    products: dataProducts, // List of products
    detailProduct: prodInDetails, // Details of the selected product
    Cart: [], // Items in the shopping cart
    CartSubTotal: 0, // Subtotal for items in the cart
  };

  // Get a product by ID
  getItem = (id) => {
    return this.state.products.find((item) => item.id === id);
  };

  // Set the detailProduct state to the selected product
  handleDetails = (id) => {
    const product = this.getItem(id);
    if (product) {
      this.setState({
        detailProduct: product,
      });
    }
  };

  // Add a product to the cart
  addToCart = (id) => {
    let tempProducts = [...this.state.products]; // Copy of products array
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true; // Mark product as in cart
    product.count = 1; // Initial count
    const price = parseFloat(product.price.replace(/[$,]/g, "")); // Convert price to number
    product.total = price; // Set initial total to price
    this.setState(
      () => {
        return { products: tempProducts, Cart: [...this.state.Cart, product] };
      },
      () => {
        this.makeTotal(); // Recalculate totals after updating state
      }
    );
  };

  // Increment the count of a product in the cart
  increment = (id) => {
    let tempCart = [...this.state.Cart]; // Copy of cart array
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count + 1; // Increase count
    product.total =
      product.count * parseFloat(product.price.replace(/[$,]/g, "")); // Update total
    this.setState(
      () => {
        return { Cart: [...tempCart] };
      },
      () => {
        this.makeTotal(); // Recalculate totals
      }
    );
  };

  // Decrement the count of a product in the cart
  decrement = (id) => {
    let tempCart = [...this.state.Cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    if (product.count > 1) {
      product.count = product.count - 1; // Decrease count
      product.total =
        product.count * parseFloat(product.price.replace(/[$,]/g, "")); // Update total
      this.setState(
        () => {
          return { Cart: [...tempCart] };
        },
        () => {
          this.makeTotal(); // Recalculate totals
        }
      );
    }
  };

  // Remove a product from the cart
  removeItem = (id) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.Cart];

    // Remove item from cart
    tempCart = tempCart.filter((item) => item.id !== id);

    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];

    // Reset product properties
    removedProduct.inCart = false;
    removedProduct.total = 0;
    removedProduct.count = 0;

    // Update state and recalculate totals
    this.setState(
      () => {
        return {
          Cart: [...tempCart],
          products: [...tempProducts],
        };
      },
      () => {
        this.makeTotal();
      }
    );
  };

  // Calculate the subtotal for items in the cart
  makeTotal = () => {
    let subTotal = 0;
    this.state.Cart.map((item) => (subTotal += item.total));
    this.setState(() => {
      return {
        CartSubTotal: subTotal,
      };
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state, // Spread the state values
          handleDetails: this.handleDetails,
          addToCart: this.addToCart,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

// Export the context consumer
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };

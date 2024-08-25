import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nab from "./component/Nab";
import "bootstrap/dist/css/bootstrap.min.css";
import Productlist from "./component/Productlist";
import Details from "./component/Details";
import Cart from "./component/Cart";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Nab />
        <Routes>
          <Route path="/" element={<Productlist />} />
          <Route path="/details" Component={Details} />
          <Route path="/cart" Component={Cart} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

import "./index.css";
import Layout from "../src/Components/Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OneCart from "./Components/OneCart/OneCart";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} path="/products" />
          <Route element={<OneCart />} path="/products/:id/" />
        <Route element={<div>Error 404 - try refresh page</div>} path="*" />
      </Routes>
      </BrowserRouter>
  );
};

export default App;

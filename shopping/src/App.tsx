import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OneCart from "./pages/OneCart";
import Main from "./pages/Main";
import Favourite from "./pages/Favourite";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Main />} path="/" />

      <Route element={<OneCart />} path="/:id/" />

      <Route element={<Favourite />} path="/favourite" />

      <Route element={<div>Error 404 - try refresh page</div>} path="*" />
    </Routes>
  </BrowserRouter>
);

export default App;

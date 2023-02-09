import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OneCart from "./pages/OneCart";
import Main from "./pages/Main";
import Favourite from "./pages/Favourite";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />} path="/" />
        <Route
          element={
            <OneCart
              item={{
                id: 0,
                category: "",
                description: "",
                image: "",
                price: 0,
                title: "",
                amount: 0,
              }}
              handleAddToCart={function (): void {
                throw new Error("Function not implemented.");
              }}
              cartProduct={[]}
              setCartOpen={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          }
          path="/:id/"
        />
        <Route
          element={
            <Favourite
              cartProduct={[]}
              setCartOpen={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          }
          path="/favourite"
        />

        <Route element={<div>Error 404 - try refresh page</div>} path="*" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import { Navigation } from "../Components/Navigation/Navigation";
import { Box } from "@mui/material";
import { BoxStyle, BreakPointTheme } from "../Components/Breakpoints/Demo";
import ControlledSwitches from "../Components/ControlledSwitches/ControlledSwitches";
import ShoppingCartIcon from "../Components/ShoppingCartIcon/ShoppingCartIcon";
import { CartProductType } from "./Main";
import { ThemeProvider } from "@mui/material";
import { Drawer } from "@mui/material";
import Cart from "../Components/Cart/Cart";
import { useEffect, useState } from "react";

const Favourite = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartProduct, setCartProduct] = useState([] as CartProductType[]);
  const [, setProduct] = useState<CartProductType[]>([]);

  const clearFromCart = (id: number) => {
    setCartProduct((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack];
        } else {
          return [...ack, item];
        }
      }, [] as CartProductType[])
    );
  };

  const getProduct = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    setProduct(data);
    localStorage.setItem("product", JSON.stringify(data));
    if (!localStorage.getItem("cartProduct")) {
      localStorage.setItem("cartProduct", "[]");
    }
    return data;
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleAddToCart = (clickedItem: CartProductType) => {
    setCartProduct((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      localStorage.setItem("cartProduct", JSON.stringify(cartProduct));
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartProduct((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartProductType[])
    );
  };
  return (
    <ThemeProvider theme={BreakPointTheme}>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartProduct={cartProduct}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          clearFromCart={clearFromCart}
        />
      </Drawer>

      <Box sx={{ ...BoxStyle(BreakPointTheme) }}>
        <Navigation />
        <ShoppingCartIcon cartProduct={cartProduct} setCartOpen={setCartOpen} />
        <ControlledSwitches />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          paddingTop: "200px",
          justifyContent: "space-around",
          backgroundImage: `url(${require("../../src/img/11.png")})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        Here are your favorite products ...
      </Box>
    </ThemeProvider>
  );
};

export default Favourite;

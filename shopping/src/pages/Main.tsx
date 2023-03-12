import { useEffect, useState } from "react";
import { Box, Drawer } from "@mui/material";
import Cart from "../Components/Cart/Cart";
import ControlledSwitches from "../Components/ControlledSwitches/ControlledSwitches";
import { ThemeProvider } from "@mui/material/styles";
import { BoxStyle, BreakPointTheme } from "../Components/BreakpointsMenu/Menu";
import { Navigation } from "../Components/Navigation/Navigation";
import ShoppingCartIcon from "../Components/ShoppingCartIcon/ShoppingCartIcon";
import { fetchProducts } from "../state/productsSlice";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import CircularProgressWithLabel from "../Components/CircularProgressWithLabel/CircularProgressWithLabel";
import Sorting from "../Components/Sorting/Sorting";

export type CartProductType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
  quantity: number;
};

const Main = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const products = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <ThemeProvider theme={BreakPointTheme}>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart />
      </Drawer>
      <Box
        sx={{
          width: "90%",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "500px",
            marginTop: "150px",
            backgroundImage: `url(${require("../../src/assets/sales8.png")})`,
            backgroundRepeat: "no-repeat",
          }}
        />
        <Box sx={{ ...BoxStyle(BreakPointTheme) }}>
          <Box
            sx={{
              fontFamily: "Playfair Display, Arial, sans-serif",
              fontSize: 25,
              width: "20%",
              padding: "20px",
              color: "#073D29",
            }}
          >
            My Shop
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Navigation />
            <ShoppingCartIcon setCartOpen={setCartOpen} />
            <ControlledSwitches />
          </Box>
        </Box>

        <Box>
          {products.loading && <CircularProgressWithLabel />}
          {!products.loading && products.error ? (
            <Box>Error: {products.error}</Box>
          ) : null}
          {!products.loading && products.products.length ? (
            <Box
              sx={{
                display: "flex",
                marginTop: "50px",
                flexWrap: "wrap",
                justifyContent: "space-around",
                background: "lightgrey",
              }}
            >
              <Sorting products={products.products} />
            </Box>
          ) : null}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Main;

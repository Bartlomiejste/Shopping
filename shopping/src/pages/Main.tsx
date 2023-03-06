import { useEffect, useState } from "react";
import { Box, Drawer } from "@mui/material";
import Items from "../Components/Item/Items";
import Cart from "../Components/Cart/Cart";
import ControlledSwitches from "../Components/ControlledSwitches/ControlledSwitches";
import { ThemeProvider } from "@mui/material/styles";
import { BoxStyle, BreakPointTheme } from "../Components/BreakpointsMenu/Menu";
import { Navigation } from "../Components/Navigation/Navigation";
import ShoppingCartIcon from "../Components/ShoppingCartIcon/ShoppingCartIcon";
import { fetchProducts } from "../state/productsSlice";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import CircularProgressWithLabel from "../Components/CircularProgressWithLabel/CircularProgressWithLabel";

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
      <Box sx={{ ...BoxStyle(BreakPointTheme) }}>
        <Navigation />
        <ShoppingCartIcon setCartOpen={setCartOpen} />
        <ControlledSwitches />
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
              flexWrap: "wrap",
              paddingTop: "200px",
              justifyContent: "space-around",
              backgroundImage: `url(${require("../../src/assets/11.png")})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            {products.products.map((products) => (
              <Items key={products.id} item={products} />
            ))}
          </Box>
        ) : null}
      </Box>
    </ThemeProvider>
  );
};

export default Main;

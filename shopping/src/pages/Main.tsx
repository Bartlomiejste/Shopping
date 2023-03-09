import { useEffect, useState } from "react";
import { Box, Drawer, Typography } from "@mui/material";
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
import SearchField from "../Components/SearchField/SearchField";

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
            height: "200px",
            background: "#FCF0E4",
            marginTop: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Typography
            sx={{
              color: "#073D29",
              fontWeight: "bold",
              fontSize: "25px",
              width: "30%",
            }}
          >
            GRAB Upto 50% Off On Selected Products
          </Typography>
          <Box
            style={{
              height: "100%",
              width: "30%",
              backgroundImage: `url(${require("../../src/assets/sales7.png")})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          />
        </Box>
        <Box sx={{ ...BoxStyle(BreakPointTheme) }}>
          <Box
            sx={{
              fontFamily:
                "Haas Grot Text R Web, Helvetica Neue, Helvetica, Arial, sans-serif",
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
            <SearchField />
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
      </Box>
    </ThemeProvider>
  );
};

export default Main;

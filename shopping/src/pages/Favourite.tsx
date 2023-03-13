import { Navigation } from "../Components/Navigation/Navigation";
import { Box, Typography } from "@mui/material";
import { BoxStyle, BreakPointTheme } from "../Components/BreakpointsMenu/Menu";
import ControlledSwitches from "../Components/ControlledSwitches/ControlledSwitches";
import ShoppingCartIcon from "../Components/ShoppingCartIcon/ShoppingCartIcon";
import { CartProductType } from "./Main";
import { ThemeProvider } from "@mui/material";
import { Drawer } from "@mui/material";
import Cart from "../Components/Cart/Cart";
import { useEffect, useState } from "react";

import Items from "../Components/Item/Items";

const Favourite = () => {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [favourites, setFavourites] = useState<CartProductType[]>([]);

  useEffect(() => {
    const favouriteProducts = localStorage.getItem("clickedItem");
    if (favouriteProducts) {
      const parsedProduct = JSON.parse(favouriteProducts);
      setFavourites(parsedProduct);
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={BreakPointTheme}>
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
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

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: "50px",
              flexWrap: "wrap",
              background: "lightgrey",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: "25px",
                marginTop: "20px",
                width: "100%",
                padding: "0 0 0 100px",
                background: "#B8BEC5",
                height: "100px",
                display: "flex",
                alignItems: "center",
              }}
            >
              Your favourite products:
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                marginTop: "50px",
                flexWrap: "wrap",
                justifyContent: "space-around",
                background: "lightgrey",
              }}
            >
              {favourites.length ? (
                favourites?.map((product) => (
                  <Items key={product.id} item={product} />
                ))
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography>You don't have a favourite product</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Favourite;

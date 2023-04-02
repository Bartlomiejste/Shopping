import { Box, Drawer, Typography } from "@mui/material";
import Cart from "../Cart/Cart";
import ControlledSwitches from "../ControlledSwitches/ControlledSwitches";
import { BoxStyle, BreakPointTheme } from "../BreakpointsMenu/BreakpointsMenu";
import { Navigation } from "../Navigation/Navigation";
import ShoppingCartIcon from "../ShoppingCartIcon/ShoppingCartIcon";
import { useState } from "react";
import imgsales from "../../assets/sales8.png";

const Menu = () => {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart />
      </Drawer>
      <Box
        component="img"
        src={imgsales}
        style={{
          maxWidth: "100%",
          height: "auto",
          marginTop: "150px",
        }}
        alt="imgSales"
      />
      <Box
        sx={{
          ...BoxStyle(BreakPointTheme),
        }}
      >
        <Typography
          sx={{
            fontFamily: "Playfair Display, Arial, sans-serif",
            fontSize: 25,
            width: "20%",
            padding: "20px",
            color: "#073D29",
            "@media only screen and (min-width: 320px) and (max-width: 424px)":
              {
                display: "none",
              },
            "@media only screen and (min-width: 425px)": {
              fontSize: "16px",
            },
          }}
        >
          My Shop
        </Typography>
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
    </>
  );
};

export default Menu;

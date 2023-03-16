import { Box, Drawer, Typography } from "@mui/material";
import Cart from "../Cart/Cart";
import ControlledSwitches from "../ControlledSwitches/ControlledSwitches";
import { BoxStyle, BreakPointTheme } from "../BreakpointsMenu/BreakpointsMenu";
import { Navigation } from "../Navigation/Navigation";
import ShoppingCartIcon from "../ShoppingCartIcon/ShoppingCartIcon";
import { useState } from "react";

const Menu = () => {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart />
      </Drawer>
      <Box
        sx={{
          width: "100%",
          height: "500px",
          marginTop: "150px",
          backgroundImage: `url(${require("../../assets/sales8.png")})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <Box sx={{ ...BoxStyle(BreakPointTheme) }}>
        <Typography
          sx={{
            fontFamily: "Playfair Display, Arial, sans-serif",
            fontSize: 25,
            width: "20%",
            padding: "20px",
            color: "#073D29",
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
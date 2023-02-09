import { Navigation } from "../Components/Navigation/Navigation";
import { Box } from "@mui/material";
import { BoxStyle, BreakPointTheme } from "../Components/Breakpoints/Demo";
import ControlledSwitches from "../Components/ControlledSwitches/ControlledSwitches";
import ShoppingCartIcon from "../Components/ShoppingCartIcon/ShoppingCartIcon";
import { CartProductType } from "./Main";

type Props = {
  cartProduct: CartProductType[];
  setCartOpen: (clickedItem: boolean) => void;
};

const Favourite = ({ cartProduct, setCartOpen }: Props) => {
  return (
    <>
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
    </>
  );
};

export default Favourite;

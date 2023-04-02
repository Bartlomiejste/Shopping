import { CartProductType } from "../../pages/Main";
import { Box, Button, Typography } from "@mui/material";
import CartItem from "../CartItem/CartItem";
import { useAppSelector } from "../../state/hooks";
import { RootState } from "../../state/store";

const Cart = () => {
  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems);

  const calculateTotal = (items: CartProductType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Box
      sx={{
        width: "50vw",
        p: "20px",
        "@media only screen and (min-width: 320px) and (max-width: 424px)": {
          width: "90vw",
        },
      }}
    >
      <Typography variant="h4">Your Shopping Cart</Typography>
      {cartItems.length === 0 ? (
        <Typography>No items in cart.</Typography>
      ) : null}

      <CartItem />

      <Box sx={{ mt: "40px" }}>
        <Typography variant="h4">
          Total: ${calculateTotal(cartItems).toFixed(2)}
        </Typography>
        <Button
          sx={{ mt: "20px" }}
          size="large"
          disableElevation
          variant="contained"
        >
          Buy
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;

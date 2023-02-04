import { CartProductType } from "../../pages/Main";
import { Box, Button, Typography } from "@mui/material";
import CartItem from "../CartItem/CartItem";

type Props = {
  cartProduct: CartProductType[];
  addToCart: (clickedItem: CartProductType) => void;
  removeFromCart: (id: number) => void;
  clearFromCart: (id: number) => void;
};

const Cart = ({
  cartProduct,
  addToCart,
  removeFromCart,
  clearFromCart,
}: Props) => {
  const calculateTotal = (items: CartProductType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Box sx={{ width: "50vw", padding: "20px" }}>
      <Typography variant="h4">Your Shopping Cart</Typography>
      {cartProduct.length === 0 ? (
        <Typography>No items in cart.</Typography>
      ) : null}
      {cartProduct.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearFromCart={clearFromCart}
        />
      ))}
      <Box sx={{ marginTop: "40px" }}>
        <Typography variant="h4">
          Total: ${calculateTotal(cartProduct).toFixed(2)}
        </Typography>
        <Button
          sx={{ marginTop: "20px" }}
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

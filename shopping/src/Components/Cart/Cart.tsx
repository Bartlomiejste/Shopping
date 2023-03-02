import { CartProductType } from "../../pages/Main";
import { Box, Button, Typography } from "@mui/material";
import CartItem from "../CartItem/CartItem";

type Props = {
  cartProduct: CartProductType[];
  handleAddToCart: (clickedItem: CartProductType) => void;
  handleRemoveFromCart: (id: number) => void;
};

const Cart = ({
  cartProduct,
  handleAddToCart,
  handleRemoveFromCart,
}: Props) => {
  const calculateTotal = (items: CartProductType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Box sx={{ width: "50vw", p: "20px" }}>
      <Typography variant="h4">Your Shopping Cart</Typography>
      {cartProduct.length === 0 ? (
        <Typography>No items in cart.</Typography>
      ) : null}
      {cartProduct.map((item: CartProductType) => (
        <CartItem
          key={item.id}
          item={item}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      ))}
      <Box sx={{ mt: "40px" }}>
        <Typography variant="h4">
          Total: ${calculateTotal(cartProduct).toFixed(2)}
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

import CartItem from "../../Components/CartProduct/CartItem";
import { CartProductType } from "../../pages/Main";
import { Box, Button, Typography } from "@mui/material";

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
      <Typography variant="h3">Your Shopping Cart</Typography>
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
      <Typography variant="h4">
        Total: ${calculateTotal(cartProduct).toFixed(2)}
      </Typography>
      <Button size="large" disableElevation variant="contained">
        Buy
      </Button>
    </Box>
  );
};

export default Cart;

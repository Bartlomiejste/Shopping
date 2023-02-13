import { CartProductType } from "../../pages/Main";
import { Box, Button, Typography } from "@mui/material";
import CartItem from "../CartItem/CartItem";
// import { useEffect } from "react";

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

  // useEffect(() => {
  //   localStorage.setItem("cartProduct", JSON.stringify(cartProduct));
  // }, [cartProduct]);

  // const storedCartProduct = JSON.parse(
  //   localStorage.getItem("cartProduct") || "[]"
  // );

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
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearFromCart={clearFromCart}
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

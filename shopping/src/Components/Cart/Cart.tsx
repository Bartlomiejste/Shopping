import CartItem from "../../Components/CartProduct/CartItem"
import { Box } from './Cart.styles';
import { CartProductType } from "../../pages/Main"
import { Button } from "@mui/material";

type Props = {
  cartProduct: CartProductType[];
  addToCart: (clickedItem: CartProductType) => void;
  removeFromCart: (id: number) => void;
  clearFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartProduct, addToCart, removeFromCart,clearFromCart }) => {
  const calculateTotal = (items: CartProductType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Box>
      <h2>Your Shopping Cart</h2>
      {cartProduct.length === 0 ? <p>No items in cart.</p> : null}
      {cartProduct.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearFromCart={clearFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartProduct).toFixed(2)}</h2>
      <Button
          size='small'
          disableElevation
          variant='contained'
        >
       Buy
        </Button>
    </Box>
  );
};

export default Cart;
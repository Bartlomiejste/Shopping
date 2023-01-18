import CartItem from "../CartProduct/CartItem/CartItem"
import { Box } from './Cart.styles';
import { CartProductType } from "../pages/Main/Main"

type Props = {
  cartProduct: CartProductType[];
  addToCart: (clickedItem: CartProductType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartProduct, addToCart, removeFromCart }) => {
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
        />
      ))}
      <h2>Total: ${calculateTotal(cartProduct).toFixed(2)}</h2>
    </Box>
  );
};

export default Cart;
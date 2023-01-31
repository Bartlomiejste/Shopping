import { Button } from "@mui/material";
// Types
import { CartProductType } from "../../pages/Main/Main"
// Styles
import { Box } from './CartItem.styles';

type Props = {
  item: CartProductType;
  addToCart: (clickedItem: CartProductType) => void;
  removeFromCart: (id: number) => void;
  clearFromCart:(id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart,clearFromCart }) => (
  <Box>
    <div>
      <h3>{item.title}</h3>
      <div className='information'>
        <p>Price: ${item.price}</p>
        <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
      </div>
      <div className='buttons'>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => removeFromCart(item.id)}
        >
          -
        </Button>
        <p>{item.amount}</p>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => addToCart(item)}
        >
          +
        </Button>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => clearFromCart(item.id)}
        >Clear</Button>
      </div>
    </div>
    <img src={item.image} alt={item.title} />
  </Box>
);

export default CartItem;
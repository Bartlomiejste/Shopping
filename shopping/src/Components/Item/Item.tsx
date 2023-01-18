
// Types
import {Button } from '@mui/material';
import { CartProductType } from "../pages/Main/Main"
// Styles
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import {Box} from './Item.styles'
type Props = {
  item: CartProductType;
  handleAddToCart: (clickedItem: CartProductType) => void;
};


const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
    <div style={{width:"33%"}}>
    <img src={item.image} alt={item.title} style={{width: "200px"}}/>
      <p>{item.title}</p>
      <p>{item.description}</p>
      <p>${item.price}</p>
    <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </div>


);

export default Item;
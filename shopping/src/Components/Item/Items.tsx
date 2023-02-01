import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import {Button } from '@mui/material';
import { CartProductType } from "../../pages/Main"

type Props = {
  item: CartProductType;
  handleAddToCart: (clickedItem: CartProductType) => void;
};


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'black' : 'white',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: "500px",
  width: "300px",
  margin: "20px",
  borderRadius: "20px",
  'img:hover': {
    transform: "scale(1.1)",
    cursor: "pointer",
 },
}));

const Items: React.FC<Props> = ({ item, handleAddToCart }) => {
  const navigate = useNavigate();
  return (
    <Item sx={{display:"flex", flexDirection:"column", justifyContent:"space-around",alignItems:"center"}}>
    <img src={item.image} alt={item.title} style={{width: "200px",height: "250px"}} 
    onClick={() => {navigate(`/products/${item.id}`)}}/>
    <div style={{fontWeight:"bold", fontSize:"16px"}}>{item.title}</div>
    <div style={{fontSize:"30px", color:"green"}}>${item.price}</div>
      <Button onClick={() => handleAddToCart(item)} sx={{fontSize:"16px", border: "2px solid", borderRadius:"20px"}}>Add to cart</Button>
     </Item>
  )
};

export default Items;
import { Button, Typography, Box } from "@mui/material";
import { CartProductType } from "../../pages/Main";

type Props = {
  item: CartProductType;
  addToCart: (clickedItem: CartProductType) => void;
  removeFromCart: (id: number) => void;
  clearFromCart: (id: number) => void;
};

const imgStyle = {
  maxWidth: "80px",
  objectFit: "cover",
  marginLeft: "40px",
};

const CartItem = ({
  item,
  addToCart,
  removeFromCart,
  clearFromCart,
}: Props) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      fontFamily: "Arial, Helvetica, sans-serif",
      borderBottom: "1px solid lightblue",
      paddingBottom: "20px",
    }}
  >
    <Typography>{item.title}</Typography>
    <Box
      sx={{
        display: "flex",
        marginTop: "10px",
        justifyContent: "space-between",
      }}
    >
      <p>Price: ${item.price}</p>
      <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
    </Box>
    <Box
      sx={{
        display: "flex",
        marginTop: "10px",
        justifyContent: "space-between",
      }}
    >
      <Button
        size="small"
        disableElevation
        variant="contained"
        onClick={() => removeFromCart(item.id)}
      >
        -
      </Button>
      <Typography>{item.amount}</Typography>
      <Button
        size="small"
        disableElevation
        variant="contained"
        onClick={() => addToCart(item)}
      >
        +
      </Button>
      <Button
        size="small"
        disableElevation
        variant="contained"
        onClick={() => clearFromCart(item.id)}
      >
        Clear
      </Button>
    </Box>
    <img src={item.image} alt={item.title} style={imgStyle} />
  </Box>
);

export default CartItem;

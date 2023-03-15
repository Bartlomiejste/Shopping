import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { CartProductType } from "../../pages/Main";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { addToCart } from "../../state/productsCart";
import Rating from "@mui/material/Rating";
type Props = {
  item: CartProductType;
};

const Item = styled(Paper)(() => ({
  backgroundColor: useAppSelector((state) =>
    state.theme.darkMode ? "gray" : "white"
  ),
  margin: "20px",
  "img:hover": {
    transform: "scale(1.1)",
    cursor: "pointer",
  },
}));

const Items = ({ item }: Props) => {
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleAdd = (cartItems: CartProductType) => {
    dispatch(addToCart(cartItems));
  };

  return (
    <Item
      sx={{
        height: "350px",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <img
        src={item.image}
        alt={item.title}
        style={{ width: "120px", height: "150px" }}
        onClick={() => {
          navigate(`/${item.id}`);
        }}
      />

      <Box
        sx={{
          marginTop: "10px",
          width: "100%",
          height: "180px",
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          alignItems: "flex-start",
          justifyContent: "space-around",
        }}
      >
        <Typography sx={{ fontSize: 12, color: darkMode ? "white" : "black" }}>
          {item.title}
        </Typography>
        <Typography sx={{ color: darkMode ? "white" : "primary" }}>
          ${item.price}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Rating name="read-only" value={5} readOnly size="small" />
          <Box component="span" sx={{ color: darkMode ? "white" : "black" }}>
            (221)
          </Box>
        </Box>
        <Button
          color="primary"
          disabled={false}
          size="small"
          variant="outlined"
          onClick={() => handleAdd(item)}
          sx={{ color: darkMode ? "white" : "primary" }}
        >
          Add to cart
        </Button>
      </Box>
    </Item>
  );
};

export default Items;

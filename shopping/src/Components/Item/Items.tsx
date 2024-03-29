import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { CartProductType } from "../../pages/Main";
import { Box } from "@mui/material";
import { useAppDispatch } from "../../state/hooks";
import { addToCart } from "../../state/productsCart";
import Rating from "@mui/material/Rating";

type Props = {
  item: CartProductType;
};

const Item = styled(Paper)(() => ({
  backgroundColor: "white",
  margin: "20px",
  "img:hover": {
    transform: "scale(1.1)",
    cursor: "pointer",
  },
}));

const Items = ({ item }: Props) => {
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
        "@media only screen and (min-width: 320px) and (max-width: 424px)": {
          width: "220px",
        },
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
        <Typography sx={{ fontSize: 12 }}>{item.title}</Typography>
        <Typography>${item.price}</Typography>
        <Box sx={{ display: "flex" }}>
          <Rating name="read-only" value={5} readOnly size="small" />
          <Box component="span">(221)</Box>
        </Box>
        <Button
          color="primary"
          disabled={false}
          size="small"
          variant="outlined"
          onClick={() => handleAdd(item)}
        >
          Add to cart
        </Button>
      </Box>
    </Item>
  );
};

export default Items;

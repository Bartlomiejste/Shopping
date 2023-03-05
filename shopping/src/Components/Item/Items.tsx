import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { CartProductType } from "../../pages/Main";
import { Box } from "@mui/material";

type Props = {
  item: CartProductType;
  handleAddToCart: (clickedItem: CartProductType) => void;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "450px",
  width: "300px",
  margin: "20px",
  "img:hover": {
    transform: "scale(1.1)",
    cursor: "pointer",
  },
}));

const Items = ({ item, handleAddToCart }: Props) => {
  const navigate = useNavigate();
  return (
    <Item
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <img
        src={item.image}
        alt={item.title}
        style={{ width: "180px", height: "220px" }}
        onClick={() => {
          navigate(`/${item.id}`);
        }}
      />
      <Box style={{ fontWeight: "bold", fontSize: "16px" }}>{item.title}</Box>
      <Box style={{ fontSize: "30px", color: "green" }}>${item.price}</Box>
      <Button variant="outlined" onClick={() => handleAddToCart(item)}>
        Add to cart
      </Button>
    </Item>
  );
};

export default Items;

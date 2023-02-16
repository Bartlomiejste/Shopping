import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { CartProductType } from "../../pages/Main";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../state/ModeTheme";

type Props = {
  item: CartProductType;
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

const Items = ({ item }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, setProduct] = useState<CartProductType[]>([]);
  const [, setCartProduct] = useState([] as CartProductType[]);

  const handleAddToCart = (clickedItem: CartProductType) => {
    dispatch(addToCart(item));
    setCartProduct((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const getProduct = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    setProduct(data);
    return data;
  };

  useEffect(() => {
    getProduct();
  }, []);

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

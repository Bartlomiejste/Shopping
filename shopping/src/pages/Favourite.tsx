import { Navigation } from "../Components/Navigation/Navigation";
import { Box, Typography } from "@mui/material";
import { BoxStyle, BreakPointTheme } from "../Components/BreakpointsMenu/Menu";
import ControlledSwitches from "../Components/ControlledSwitches/ControlledSwitches";
import ShoppingCartIcon from "../Components/ShoppingCartIcon/ShoppingCartIcon";
import { CartProductType } from "./Main";
import { ThemeProvider } from "@mui/material";
import { Drawer } from "@mui/material";
import Cart from "../Components/Cart/Cart";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { addToCart } from "../state/productsCart";
import { useAppDispatch } from "../state/hooks";
import { useNavigate } from "react-router-dom";
import SearchField from "../Components/SearchField/SearchField";

const Favourite = () => {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [favourites, setFavourites] = useState<CartProductType[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const favouriteProducts = localStorage.getItem("clickedItem");
    if (favouriteProducts) {
      const parsedProduct = JSON.parse(favouriteProducts);
      setFavourites(parsedProduct);
    }
  }, []);

  const dispatch = useAppDispatch();
  const handleAdd = (cartItems: CartProductType) => {
    dispatch(addToCart(cartItems));
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

  return (
    <>
      <ThemeProvider theme={BreakPointTheme}>
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart />
        </Drawer>

        <Box
          sx={{
            width: "90%",
            margin: "0 auto",
          }}
        >
          <Box sx={{ ...BoxStyle(BreakPointTheme) }}>
            <Box
              sx={{
                fontFamily: "Playfair Display, Arial, sans-serif",
                fontSize: 25,
                width: "20%",
                padding: "20px",
                color: "#073D29",
              }}
            >
              My Shop
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <SearchField />
              <Navigation />
              <ShoppingCartIcon setCartOpen={setCartOpen} />
              <ControlledSwitches />
            </Box>
          </Box>
        </Box>

        {favourites.length ? (
          favourites?.map((product) => (
            <Item
              key={product.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{ width: "180px", height: "220px" }}
                onClick={() => {
                  navigate(`/${product.id}`);
                }}
              />
              <Box style={{ fontWeight: "bold", fontSize: "16px" }}>
                {product.title}
              </Box>
              <Box style={{ fontSize: "30px", color: "green" }}>
                ${product.price}
              </Box>
              <Button variant="outlined" onClick={() => handleAdd(product)}>
                Add to cart
              </Button>
            </Item>
          ))
        ) : (
          <Typography
            sx={{
              marginTop: "200px",
              width: "100%",
              textAlign: "center",
            }}
          >
            You don't have a favourite product
          </Typography>
        )}
      </ThemeProvider>
    </>
  );
};

export default Favourite;

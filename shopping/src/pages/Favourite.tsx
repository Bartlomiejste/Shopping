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

const Favourite = () => {
  const [cartProduct, setCartProduct] = useState([] as CartProductType[]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [favourites, setFavourites] = useState<CartProductType[]>([]);

  useEffect(() => {
    const favouriteProduct = localStorage.getItem("clickedItem");
    if (favouriteProduct) {
      const parsedProduct = JSON.parse(favouriteProduct);
      setFavourites([parsedProduct]);
    }
  }, []);

  const handleAddToCart = (clickedItem: CartProductType) => {
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

  const handleRemoveFromCart = (id: number) => {
    setCartProduct((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartProductType[])
    );
  };

  const clearFromCart = (id: number) => {
    setCartProduct((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack];
        } else {
          return [...ack, item];
        }
      }, [] as CartProductType[])
    );
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
          <Cart
            cartProduct={cartProduct}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            clearFromCart={clearFromCart}
          />
        </Drawer>

        <Box sx={{ ...BoxStyle(BreakPointTheme) }}>
          <Navigation />
          <ShoppingCartIcon
            cartProduct={cartProduct}
            setCartOpen={setCartOpen}
          />
          <ControlledSwitches />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            paddingTop: "200px",
            justifyContent: "space-around",
            backgroundImage: `url(${require("../../src/img/11.png")})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100vh",
          }}
        >
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
                />
                <Box style={{ fontWeight: "bold", fontSize: "16px" }}>
                  {product.title}
                </Box>
                <Box style={{ fontSize: "30px", color: "green" }}>
                  ${product.price}
                </Box>
                <Button
                  variant="outlined"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </Button>
              </Item>
            ))
          ) : (
            <Typography sx={{ marginTop: "200px" }}>
              You don't have a favourite product
            </Typography>
          )}
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Favourite;

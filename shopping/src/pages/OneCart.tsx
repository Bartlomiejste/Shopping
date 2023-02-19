import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, ThemeProvider } from "@mui/material";
import { Navigation } from "../Components/Navigation/Navigation";
import ControlledSwitches from "../Components/ControlledSwitches/ControlledSwitches";
import ShoppingCartIcon from "../Components/ShoppingCartIcon/ShoppingCartIcon";
import { BoxStyle, BreakPointTheme } from "../Components/Breakpoints/Demo";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Drawer } from "@mui/material";
import Cart from "../Components/Cart/Cart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CartProductType } from "./Main";

const OneCart = () => {
  const [product, setProduct] = useState<CartProductType>();
  const { id } = useParams<string>();
  const [cartProduct, setCartProduct] = useState([] as CartProductType[]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
  };

  const getProduct = async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
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

  const handleAddToCart = (clickedItem: CartProductType) => {
    localStorage.setItem("localCart", JSON.stringify(product));
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

        {product && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              backgroundImage: `url(${require("../img/5.png")})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "100%",
              height: "100vh",
              padding: "0 40px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                height: "400px",
                width: "50%",
                background: "#fff",
                padding: "50px",
              }}
            >
              <Box>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: "50%", height: "50%" }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  width: "100%",
                  justifyContent: "space-evenly",
                  fontFamily: "Arial",
                }}
              >
                <Box style={{ fontWeight: "bold", fontSize: "16px" }}>
                  {product.title}
                </Box>
                <Box style={{ fontSize: "25px", color: "green" }}>
                  ${product.price}
                </Box>
                <Box style={{ fontSize: "14px" }}>{product.description}</Box>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleClick}
                    aria-label="add to favorites"
                  >
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    Favourite
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </ThemeProvider>
    </>
  );
};

export default OneCart;

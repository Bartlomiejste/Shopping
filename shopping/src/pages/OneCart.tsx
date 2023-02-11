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

type Props = {
  products: CartProductType;
};

const OneCart = ({ products }: Props) => {
  const [product, setProduct] = useState<CartProductType[]>([]);
  const { id } = useParams();
  const [cartProduct, setCartProduct] = useState([] as CartProductType[]);
  const [cartOpen, setCartOpen] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
  };

  // const onFavorite = (favouriteProduct: CartProductType) => {
  //   setProduct([...product, favouriteProduct]);
  // };
  // const onRemoveFavorite = (favouriteProduct: CartProductType) => {
  //   const filteredList = product.filter(
  //     (item) => item.id !== favouriteProduct.id
  //   );
  //   setProduct(filteredList);
  // };

  // const ifExists = (favouriteProduct: CartProductType) => {
  //   if (product.filter((item) => item.id === product.id).length > 0) {
  //     return true;
  //   }
  //   return false;
  // };

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
                  src={products.image}
                  alt={products.title}
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
                  {products.title}
                </Box>
                <Box style={{ fontSize: "25px", color: "green" }}>
                  ${products.price}
                </Box>
                <Box style={{ fontSize: "14px" }}>{products.description}</Box>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => handleAddToCart(products)}
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

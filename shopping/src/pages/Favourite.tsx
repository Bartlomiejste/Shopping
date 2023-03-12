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
import Rating from "@mui/material/Rating";

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
          <Box
            sx={{
              width: "100%",
              height: "500px",
              marginTop: "150px",
              backgroundImage: `url(${require("../../src/assets/sales8.png")})`,
              backgroundRepeat: "no-repeat",
            }}
          />
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
              <Navigation />
              <ShoppingCartIcon setCartOpen={setCartOpen} />
              <ControlledSwitches />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            marginTop: "50px",
            flexWrap: "wrap",
            justifyContent: "space-around",
            background: "lightgrey",
          }}
        >
          {favourites.length ? (
            favourites?.map((product) => (
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
                  src={product.image}
                  alt={product.title}
                  style={{ width: "120px", height: "150px" }}
                  onClick={() => {
                    navigate(`/${product.id}`);
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
                  <Typography sx={{ fontSize: 12 }}>{product.title}</Typography>
                  <Typography style={{ color: "green" }}>
                    ${product.price}
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Rating name="read-only" value={5} readOnly size="small" />
                    <Box component="span">(221)</Box>
                  </Box>
                  <Button
                    sx={{
                      borderRadius: 20,
                    }}
                    color="primary"
                    disabled={false}
                    size="small"
                    variant="outlined"
                    onClick={() => handleAdd(product)}
                  >
                    Add to cart
                  </Button>
                </Box>
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
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Favourite;

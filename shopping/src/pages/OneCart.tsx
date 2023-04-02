import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, ThemeProvider } from "@mui/material";
import { BreakPointTheme } from "../Components/BreakpointsMenu/BreakpointsMenu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CartProductType } from "./Main";
import { addToCart } from "../state/productsCart";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import Rating from "@mui/material/Rating";
import Menu from "../Components/Menu/Menu";

const OneCart = () => {
  const [product, setProduct] = useState<CartProductType>();
  const { id } = useParams<string>();
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const [favourites, setFavourites] = useState<CartProductType[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const prevItems = localStorage.getItem("clickedItem");
    const favProducts = prevItems ? JSON.parse(prevItems) : [];
    const productIdFromFav: number[] = favProducts.map((el: any) => el.id);
    if (productIdFromFav.includes(Number(id))) {
      setIsFavorite(true);
    }
  }, []);

  const dispatch = useAppDispatch();
  const handleAdd = (cartItems: CartProductType) => {
    dispatch(addToCart(cartItems));
  };

  useEffect(() => {
    getProduct();
  }, []);

  const addToFavourite = (clickedItem: CartProductType) => {
    const prevItems = localStorage.getItem("clickedItem");
    const favProducts = prevItems ? JSON.parse(prevItems) : [];
    const newValue = JSON.stringify([...favProducts, clickedItem]);
    localStorage.setItem("clickedItem", newValue);
    setIsFavorite(true);
    if (!favourites.includes(clickedItem)) {
      setFavourites([...favourites, clickedItem]);
    } else {
      setFavourites([...favourites.filter((item) => item !== clickedItem)]);
    }
    return;
  };

  const removeFromFavourite = (clickedItem: CartProductType) => {
    const prevItems = localStorage.getItem("clickedItem");
    const favProducts = prevItems ? JSON.parse(prevItems) : [];
    const newFavProducts = favProducts.filter((el: any) => {
      return el.id !== clickedItem.id;
    });
    setIsFavorite(false);
    localStorage.setItem("clickedItem", JSON.stringify(newFavProducts));
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

  return (
    <>
      <ThemeProvider theme={BreakPointTheme}>
        <Box
          sx={{
            width: "90%",
            margin: "0 auto",
          }}
        >
          <Menu />
        </Box>
        {product && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "50px",
              flexWrap: "wrap",
              backgroundColor: darkMode ? "gray" : "lightgrey",
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
                "@media only screen and (min-width: 320px) and (max-width: 424px)":
                  {
                    width: "400px",
                  },
              }}
            >
              <Box>
                <Box
                  component="img"
                  src={product.image}
                  alt={product.title}
                  sx={{
                    width: "50%",
                    height: "50%",
                    "@media only screen and (min-width: 320px) and (max-width: 424px)":
                      {
                        display: "none",
                      },
                  }}
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
                <Box
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    "@media only screen and (min-width: 320px) and (max-width: 424px)":
                      {
                        fontSize: "12px",
                      },
                  }}
                >
                  {product.title}
                </Box>

                <Box
                  sx={{
                    fontSize: "25px",
                    color: "green",
                    "@media only screen and (min-width: 320px) and (max-width: 424px)":
                      {
                        fontSize: "12px",
                      },
                  }}
                >
                  ${product.price}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    "@media only screen and (min-width: 320px) and (max-width: 424px)":
                      {
                        fontSize: "12px",
                      },
                  }}
                >
                  <Rating name="read-only" value={5} readOnly size="small" />
                  <Box component="span">(221)</Box>
                </Box>
                <Box
                  sx={{
                    fontSize: "14px",
                    "@media only screen and (min-width: 320px) and (max-width: 424px)":
                      {
                        fontSize: "12px",
                      },
                  }}
                >
                  {product.description}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Button
                    sx={{
                      "@media only screen and (min-width: 320px) and (max-width: 424px)":
                        {
                          fontSize: "12px",
                          height: "36px",
                        },
                    }}
                    variant="outlined"
                    onClick={() => handleAdd(product)}
                  >
                    Add to cart
                  </Button>
                  <Button
                    sx={{
                      "@media only screen and (min-width: 320px) and (max-width: 424px)":
                        {
                          fontSize: "12px",
                        },
                    }}
                    variant="outlined"
                    onClick={() =>
                      !isFavorite
                        ? addToFavourite(product)
                        : removeFromFavourite(product)
                    }
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

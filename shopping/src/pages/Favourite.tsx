import { Box, Typography } from "@mui/material";
import { BreakPointTheme } from "../Components/BreakpointsMenu/BreakpointsMenu";
import { CartProductType } from "./Main";
import { ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import Items from "../Components/Item/Items";
import Menu from "../Components/Menu/Menu";
import { useAppSelector } from "../state/hooks";

const Favourite = () => {
  const [favourites, setFavourites] = useState<CartProductType[]>([]);
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  useEffect(() => {
    const favouriteProducts = localStorage.getItem("clickedItem");
    if (favouriteProducts) {
      const parsedProduct = JSON.parse(favouriteProducts);
      setFavourites(parsedProduct);
    }
  }, []);

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

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: "50px",
              flexWrap: "wrap",
              backgroundColor: "lightgrey",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: "25px",
                marginTop: "20px",
                width: "100%",
                padding: "0 0 0 100px",
                backgroundColor: darkMode ? "gray" : "#B8BEC5",
                height: "100px",
                display: "flex",
                alignItems: "center",
              }}
            >
              Your favourite products:
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                marginTop: "50px",
                flexWrap: "wrap",
                justifyContent: "space-around",
                background: "lightgrey",
              }}
            >
              {favourites.length ? (
                favourites?.map((product) => (
                  <Items key={product.id} item={product} />
                ))
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography>You don't have a favourite product</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Favourite;

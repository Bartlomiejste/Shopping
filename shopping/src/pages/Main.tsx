import { useEffect } from "react";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { BreakPointTheme } from "../Components/BreakpointsMenu/BreakpointsMenu";
import { fetchProducts } from "../state/productsSlice";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import CircularProgressWithLabel from "../Components/CircularProgressWithLabel/CircularProgressWithLabel";
import Sorting from "../Components/Sorting/Sorting";
import Menu from "../Components/Menu/Menu";

export type CartProductType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
  quantity: number;
};

const Main = () => {
  const products = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <ThemeProvider theme={BreakPointTheme}>
      <Box
        sx={{
          width: "90%",
          margin: "0 auto",
        }}
      >
        <Menu />

        {products.loading && <CircularProgressWithLabel />}
        {!products.loading && products.error ? (
          <Box>Error: {products.error}</Box>
        ) : null}
        {!products.loading && products.products.length ? (
          <Box
            sx={{
              display: "flex",
              marginTop: "50px",
              flexWrap: "wrap",
              justifyContent: "space-around",
              background: "lightgrey",
            }}
          >
            <Sorting products={products.products} />
          </Box>
        ) : null}
      </Box>
    </ThemeProvider>
  );
};

export default Main;

import { useEffect, useState } from "react";
import { Box, Drawer } from "@mui/material";
import Items from "../Components/Item/Items";
import Cart from "../Components/Cart/Cart";
import ControlledSwitches from "../Components/ControlledSwitches/ControlledSwitches";
import { ThemeProvider } from "@mui/material/styles";
import { BoxStyle, BreakPointTheme } from "../Components/BreakpointsMenu/Menu";
import { Navigation } from "../Components/Navigation/Navigation";
import ShoppingCartIcon from "../Components/ShoppingCartIcon/ShoppingCartIcon";
import { fetchProducts } from "../Components/state/productsSlice";
import { useAppDispatch, useAppSelector } from "../Components/state/hooks";
import CircularProgressWithLabel from "../Components/CircularProgressWithLabel/CircularProgressWithLabel";

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
  const [cartOpen, setCartOpen] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType[]>([]);
  const products = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    const allProducts = localStorage.getItem("shoppingCart");
    if (allProducts) {
      const parsedProduct = JSON.parse(allProducts);
      setCartProduct(parsedProduct);
    }
  }, []);

  const handleAddToCart = (clickedItem: CartProductType) => {
    setCartProduct((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        const allProducts = prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
        localStorage.setItem("shoppingCart", JSON.stringify([...allProducts]));
        return allProducts;
      } else {
        localStorage.setItem(
          "shoppingCart",
          JSON.stringify([...prev, { ...clickedItem, amount: 1 }])
        );
        return [...prev, { ...clickedItem, amount: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartProduct((prev) => {
      const updatedCartData = prev
        .map((cartItem) => {
          if (cartItem.id === id) {
            if (cartItem.amount === 1) {
              return null;
            } else {
              return { ...cartItem, amount: cartItem.amount - 1 };
            }
          } else {
            return cartItem;
          }
        })
        .filter(Boolean) as CartProductType[];
      localStorage.setItem("shoppingCart", JSON.stringify(updatedCartData));
      return updatedCartData;
    });
  };

  // const handleClearFromCart = (id: number) => {
  //   setCartProduct((prev) => {
  //     const updatedCartData = prev.filter((cartItem) => cartItem.id !== id);
  //     localStorage.setItem("shoppingCart", JSON.stringify(updatedCartData));
  //     return updatedCartData;
  //   });
  // };

  return (
    <ThemeProvider theme={BreakPointTheme}>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartProduct={cartProduct}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      </Drawer>

      <Box sx={{ ...BoxStyle(BreakPointTheme) }}>
        <Navigation />
        <ShoppingCartIcon
          cartProducts={cartProduct}
          setCartOpen={setCartOpen}
        />
        <ControlledSwitches />
      </Box>
      <Box>
        {products.loading && <CircularProgressWithLabel />}
        {!products.loading && products.error ? (
          <Box>Error: {products.error}</Box>
        ) : null}

        {!products.loading && products.products.length ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              paddingTop: "200px",
              justifyContent: "space-around",
              backgroundImage: `url(${require("../../src/img/11.png")})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            {products.products.map((products) => (
              <Items
                key={products.id}
                item={products}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </Box>
        ) : null}
      </Box>
    </ThemeProvider>
  );
};

export default Main;

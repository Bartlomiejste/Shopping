import { Navigation } from "../Components/Navigation/Navigation";
import { Box } from "@mui/material";
import { BoxStyle, BreakPointTheme } from "../Components/BreakpointsMenu/Menu";
import ControlledSwitches from "../Components/ControlledSwitches/ControlledSwitches";
import ShoppingCartIcon from "../Components/ShoppingCartIcon/ShoppingCartIcon";
import { CartProductType } from "./Main";
import { ThemeProvider } from "@mui/material";
import { Drawer } from "@mui/material";
import Cart from "../Components/Cart/Cart";
import { useEffect, useState } from "react";

function Favourite() {
  const [, setProduct] = useState<CartProductType[]>([]);
  const [cartProduct, setCartProduct] = useState([] as CartProductType[]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  useEffect(() => {
    const url = `https://fakestoreapi.com/products`;
    const fetchData = async () => {
      try {
        const response = await fetch(url).then((res) => res.json());
        setProduct(response);
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            console.log("api request has been cancelled");
          }
          console.log(err.name);
        } else {
          console.log("This is an unknown error");
        }
      }
    };
    fetchData();
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

        {/* {favourites.length ? (
          favourites?.map(
            (product: {
              image: string | undefined;
              title: string | undefined;
            }) => (
              <img
                src={product.image}
                alt={product.title}
                style={{ width: "50%", height: "50%" }}
              />
            )
          )
        ) : (
          <p>You don't have to favourite product</p>
        )} */}
      </ThemeProvider>
    </>
  );
}

export default Favourite;

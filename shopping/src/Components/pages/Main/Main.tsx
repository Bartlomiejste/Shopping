import { useEffect, useState } from "react";
import { Badge, Box, Drawer, IconButton} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Item from "../../Item/Item";
import Cart from "../../Cart/Cart";
import ControlledSwitches from "../../ControlledSwitches/ControlledSwitches";
import BottomNavigation from "../../BottomNavigation/BottomNavigation";
import { ThemeProvider } from "@mui/material/styles";
import { BoxStyle, BreakPointTheme } from "../../Breakpoints/Demo";


export type CartProductType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const Main = () => {
  const [products, setProducts] = useState<CartProductType[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartProduct, setCartProduct] = useState([] as CartProductType[]);

  const getProducts = async (): Promise<CartProductType[]> => {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    setProducts(data);
    console.log(data);
    return data;
  };

  useEffect(() => {
    getProducts();
  }, []);


  const getTotalItems = (items: CartProductType[]) =>
  items.reduce((ack: number, item) => ack + item.amount, 0);



  const handleAddToCart = (clickedItem: CartProductType) => {
    setCartProduct(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartProduct(prev =>
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
  <ThemeProvider theme={BreakPointTheme}>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartProduct={cartProduct}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <Box sx={{...BoxStyle(BreakPointTheme)}}>
        
      <BottomNavigation />

      <IconButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartProduct)} color='error'>
          <AddShoppingCartIcon sx={{fontSize: 30}}/>
        </Badge>
      </IconButton>
     
      <ControlledSwitches />
      </Box>
        {products?.map((product) => (
          <Item key={product.id} item={product} handleAddToCart={handleAddToCart} />
        ))}
    </ThemeProvider>
  );
};

export default Main;

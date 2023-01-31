import { useEffect, useState } from "react";
import { Badge, Box, Drawer, IconButton} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Items from "../../Components/Item/Items"
import Cart from "../../Components/Cart/Cart";
import ControlledSwitches from "../../Components/ControlledSwitches/ControlledSwitches";
import { ThemeProvider } from "@mui/material/styles";
import { BoxStyle, BreakPointTheme } from "../../Components/Breakpoints/Demo";
import { Navigation } from "../../Components/Navigation/Navigation";



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
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
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

  const clearFromCart = (id: number) => {
    setCartProduct(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack];
        } else {
          return [...ack, item];
        }
      }, [] as CartProductType[])
    );
  }
  


  return (
<ThemeProvider theme={BreakPointTheme}>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartProduct={cartProduct}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          clearFromCart={clearFromCart}
        />
      </Drawer>
      <Box sx={{...BoxStyle(BreakPointTheme)}}>

        
     <Navigation/>

      <IconButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartProduct)} color='error'>
          <AddShoppingCartIcon sx={{fontSize: 30}}/>
        </Badge>
      </IconButton>
     
      <ControlledSwitches />
      </Box>
<Box sx={{display: "flex", flexWrap:"wrap", paddingTop: "200px", justifyContent:"space-around", background:"gray"}}>
        {products?.map((product) => (
          <Items key={product.id} item={product} handleAddToCart={handleAddToCart} />
        ))}
</Box>
    </ThemeProvider>
  );
};

export default Main;

import { useEffect, useState } from "react";
import { Box} from "@mui/material";
import Items from "../Components/Item/Items"
import Menu from "../pages/Menu"


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

  return (
    <>

      <Menu/>
<Box sx={{display: "flex", flexWrap:"wrap", paddingTop: "200px", justifyContent:"space-around", background:"gray"}}>
        {products?.map((product) => (
          <Items key={product.id} item={product} handleAddToCart={handleAddToCart} />
        ))}
</Box>
</>
  );
};

export default Main;
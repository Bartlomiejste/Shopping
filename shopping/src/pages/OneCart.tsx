import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as React from "react";
import { Box, Button } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";

export type CartProductType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const OneCart: React.FC = () => {
  const [product, setProduct] = useState<CartProductType | null>(null);
  const [value] = React.useState(0);
  const { id } = useParams();

  const getProduct = async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    setProduct(data);
    console.log(data);
    return data;
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
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
                src={product.image}
                alt={product.title}
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
                {product.title}
              </Box>
              <Box style={{ fontSize: "25px", color: "green" }}>
                ${product.price}
              </Box>
              <Box style={{ fontSize: "14px" }}>{product.description}</Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Button variant="outlined">Add to cart</Button>
                <BottomNavigation
                  showLabels
                  value={value}
                  // onChange={(event, newValue) => {
                  //   setValue(newValue); // in bulding to add favourite products
                  // }}
                >
                  <BottomNavigationAction icon={<FavoriteIcon />} />
                </BottomNavigation>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default OneCart;

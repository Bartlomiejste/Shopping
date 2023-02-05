import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as React from "react";
import { Box } from "@mui/material";
import Menu from "../../pages/Menu";

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
      <Menu />
      {product && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            paddingTop: "200px",
            justifyContent: "space-around",
            background: "gray",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "200px",
              height: "500px",

              background: "#fff",
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

                justifyContent: "space-around",
                alignItems: "space-around",
              }}
            >
              <Box style={{ fontWeight: "bold", fontSize: "16px" }}>
                {product.title}
              </Box>
              <Box style={{ fontSize: "30px", color: "green" }}>
                ${product.price}
              </Box>
              <Box>{product.description}</Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default OneCart;

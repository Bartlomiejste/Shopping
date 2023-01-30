import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

export type CartProductType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const OneCart = () => {
  const [product, setProduct] = useState<CartProductType[]>([]);
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
{Array.isArray(product) ?
product.map((product) => {
  return (
    <div key={product?.id}>
    <img src={product?.image} alt={product?.title} style={{width: "200px",height: "250px"}} />
    <div style={{fontWeight:"bold", fontSize:"16px"}}>{product?.title}</div>
    <div style={{fontSize:"30px", color:"green"}}>${product?.price}</div>
     </div>
)
})
: null}
     </>

  )
}


export default OneCart
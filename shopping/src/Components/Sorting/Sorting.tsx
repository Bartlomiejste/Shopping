import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { CartProductType } from "../../pages/Main";
import Items from "../Item/Items";
import { Box } from "@mui/material";
import SearchField from "../../Components/SearchField/SearchField";
import { useAppSelector } from "../../state/hooks";

type SortOption = "lowToHigh" | "highToLow" | "fromAtoZ" | "fromZtoA";

type InitialState = CartProductType[];

type Props = {
  products: InitialState;
};

const Sorting = ({ products }: Props) => {
  const [sort, setSort] = useState<SortOption>();
  const [productsSort, setProductsSort] = useState<InitialState>(products);

  const sortProducts = (sortOption: SortOption, productList: InitialState) => {
    const sortedProducts = [...productList];
    sortedProducts.sort((a, b) => {
      if (sortOption === "lowToHigh") {
        return a.price - b.price;
      } else if (sortOption === "highToLow") {
        return b.price - a.price;
      } else if (sortOption === "fromAtoZ") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    return sortedProducts;
  };

  const handleSearch = (query: string) => {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setProductsSort(filteredProducts);
  };

  const handleChange = (event: SelectChangeEvent<SortOption>) => {
    setSort(event.target.value as SortOption);
    setProductsSort(sortProducts(event.target.value as SortOption, products));
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: useAppSelector((state) =>
            state.theme.darkMode ? "gray" : "#B8BEC5"
          ),
          marginTop: "20px",
          width: "100%",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <SearchField onSearch={handleSearch} />
        <FormControl
          variant="outlined"
          sx={{
            "@media only screen and (min-width: 320px) and (max-width: 424px)":
              {
                width: "100px",
              },
          }}
        >
          <InputLabel htmlFor="sort-by">Sort By</InputLabel>
          <Select
            native
            labelId="sort-by"
            id="sort-by"
            value={sort}
            label="Sort By"
            onChange={handleChange}
          >
            <option value={""}></option>
            <option value={"lowToHigh"}>Price: Low to High</option>
            <option value={"highToLow"}>Price: High to Low</option>
            <option value={"fromAtoZ"}>Title: From A to Z</option>
            <option value={"fromZtoA"}>Title: From Z to A</option>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          marginTop: "50px",
          flexWrap: "wrap",
          justifyContent: "space-around",
          background: "lightgrey",
        }}
      >
        {productsSort.map((product: CartProductType) => (
          <Items key={product.id} item={product} />
        ))}
      </Box>
    </>
  );
};

export default Sorting;

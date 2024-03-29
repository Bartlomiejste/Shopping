import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

interface SearchFieldProps {
  onSearch: (query: string) => void;
}

export default function SearchField(props: SearchFieldProps) {
  const { onSearch } = props;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    onSearch(query);
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "250px",
        height: 30,
        background: "#F5F7F9",
        "@media only screen and (min-width: 320px) and (max-width: 425px)": {
          width: "105px",
        },
      }}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          fontSize: "13px",
          fontFamily: "Playfair Display, Arial, sans-serif",
        }}
        placeholder="Search products"
        inputProps={{ "aria-label": "Search products" }}
        onChange={handleSearch}
      />
      <IconButton
        type="button"
        sx={{
          p: "10px",
        }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

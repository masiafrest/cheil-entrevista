import useHotelContext from "../utils/useHotelContext";

import {
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Rating,
} from "@mui/material";

export default function FilterBar() {
  const [state, dispatch] = useHotelContext();

  return (
    <>
      <Box
        sx={{
          backgroundColor: "wheat",
          height: "20vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        <FormControl sx={{ width: "150px" }}>
          <InputLabel id="priceOrderBy">Ordenar Precio</InputLabel>
          <Select
            labelId="priceOrderBy"
            id="priceOrderBy-select"
            value={state.priceOrderBy}
            label="priceOrderBy"
            onChange={(e) =>
              dispatch({ type: "priceOrderBy", payload: e.target.value })
            }
          >
            <MenuItem value={"asc"}>asc</MenuItem>
            <MenuItem value={"desc"}>desc</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <div>
            <Typography component="legend">Rating</Typography>
            <Rating
              name="rating"
              value={state.rating}
              onChange={(event, newValue) => {
                dispatch({ type: "rating", payload: newValue });
              }}
            />
          </div>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: "rating", payload: null })}
          >
            Reset Rating
          </Button>
        </Box>
        <div>
          <FormControl sx={{ width: "150px" }}>
            <InputLabel id="category">Categoria</InputLabel>
            <Select
              labelId="category"
              id="category-select"
              defaultValue={state.category}
              value={state.category}
              label="category"
              onChange={(e) =>
                dispatch({ type: "category", payload: e.target.value })
              }
            >
              <MenuItem value={""}>Todos</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Box>
    </>
  );
}

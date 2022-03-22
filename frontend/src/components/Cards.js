import useHotelContext from "../utils/useHotelContext";
import Card from "./Card";
import { Grid } from "@mui/material";

export default function Cards() {
  const [state] = useHotelContext();
  return (
    <Grid container spacing={2} columns={{ xs: 4, sm: 8 }}>
      {state.hotels.map((hotel) => (
        <Grid items>
          <Card key={hotel.name} hotel={hotel} />
        </Grid>
      ))}
    </Grid>
  );
}

import useHotelContext from "../utils/useHotelContext";
import Card from "./Card";
import { Grid } from "@mui/material";

export default function Cards() {
  const [state] = useHotelContext();
  return (
    <Grid container spacing={2} sx={{ justifyContent: "center" }}>
      {state.hotels.length === 0 ? (
        <h1>Hoteles no encontrado</h1>
      ) : (
        state.hotels.map((hotel) => (
          <Grid item key={hotel.name}>
            <Card hotel={hotel} />
          </Grid>
        ))
      )}
    </Grid>
  );
}

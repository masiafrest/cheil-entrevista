import { HotelContextProvider } from "./context/hotelContext";
import Cards from "./components/Cards";
import FilterBar from "./components/FilterBar";
import { Container } from "@mui/material";

function App() {
  //barra de filtar categoria
  return (
    <>
      <HotelContextProvider>
        <FilterBar />
        <Container sx={{ marginTop: "20px" }}>
          <Cards />
        </Container>
      </HotelContextProvider>
    </>
  );
}

export default App;

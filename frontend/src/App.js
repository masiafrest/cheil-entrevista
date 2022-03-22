import { HotelContextProvider } from "./context/hotelContext";
import Cards from "./components/Cards";
import { Container } from "@mui/material";

function App() {
  //barra de filtar categoria
  return (
    <>
      <HotelContextProvider>
        <Container>
          <Cards />
        </Container>
      </HotelContextProvider>
    </>
  );
}

export default App;

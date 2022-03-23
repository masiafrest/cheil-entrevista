import { useState } from "react";
import { HotelContextProvider } from "./context/hotelContext";
import Cards from "./components/Cards";
import FilterBar from "./components/FilterBar";
import Dialog from "./components/Dialog";

import { Container, Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <HotelContextProvider>
        <FilterBar />
        <Container sx={{ marginTop: "20px" }}>
          <Cards />
        </Container>
        <Dialog setOpen={setOpen} open={open} />
        <Fab sx={{ position: "fixed", bottom: 16, right: 16 }}>
          <AddIcon />
        </Fab>
      </HotelContextProvider>
    </>
  );
}

export default App;

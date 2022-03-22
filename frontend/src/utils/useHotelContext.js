import { useContext } from "react";
import { HotelContext } from "../context/hotelContext";

const useHotelContext = () => {
  // get the context
  const context = useContext(HotelContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useHotelContext was used outside of its Provider");
  }
  return context;
};

export default useHotelContext;

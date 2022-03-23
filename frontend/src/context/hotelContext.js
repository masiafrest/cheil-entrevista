import { createContext, useReducer, useEffect } from "react";
import hotelServices from "../services/hotel";

const HotelContext = createContext(null);

const HotelContextProvider = ({ children }) => {
  const initialState = {
    hotels: [],
    category: "",
    rating: null,
    priceOrderBy: "asc",
  };
  const actionMap = {
    hotels: (state, action) => ({ ...state, hotels: action.payload }),
    category: (state, action) => ({ ...state, category: action.payload }),
    rating: (state, action) => ({ ...state, rating: action.payload }),
    priceOrderBy: (state, action) => ({
      ...state,
      priceOrderBy: action.payload,
    }),
  };
  const hotelReducer = (state, action) => {
    const handler = actionMap[action.type];
    return handler ? handler(state, action) : state;
  };

  const hotelSlice = useReducer(hotelReducer, initialState);
  const [state, dispatch] = hotelSlice;
  const { priceOrderBy, rating, category } = state;

  useEffect(() => {
    hotelServices
      .getAll(state)
      .then((data) => {
        dispatch({ type: "hotels", payload: data });
      })
      .catch((e) => console.log(e));
  }, [priceOrderBy, rating, category]);

  return (
    <HotelContext.Provider value={hotelSlice}>{children}</HotelContext.Provider>
  );
};

export { HotelContext, HotelContextProvider };

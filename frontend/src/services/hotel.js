import axios from "axios";
const baseUrl = "/api/hotel";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

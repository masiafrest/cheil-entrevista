import axios from "axios";
const baseUrl = "/api/hotel";

const getAll = async (filter) => {
  console.log(filter);
  const { category, rating, priceOrderBy } = filter;
  const params = {};

  if (category) params.category = category;
  if (rating) params.rating = rating;
  if (priceOrderBy) params.priceOrderBy = priceOrderBy;

  const res = await axios.get(baseUrl, { params });
  return res.data;
};

export default {
  getAll,
};

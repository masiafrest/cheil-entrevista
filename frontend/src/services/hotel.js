import axios from "axios";
const baseUrl = "/api/hotel";

const getAll = async (filter) => {
  const { category, rating, priceOrderBy } = filter;
  const params = {};

  if (category) params.category = category;
  if (rating) params.rating = rating;
  if (priceOrderBy) params.priceOrderBy = priceOrderBy;

  const res = await axios.get(baseUrl, { params });
  return res.data;
};

const postComment = async (id, commentObj) => {
  const res = await axios.post(`${baseUrl}/${id}/comment`, { ...commentObj });
  return res.data;
};

export default {
  getAll,
  postComment,
};

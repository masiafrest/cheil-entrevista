const Comment = require("../models/Comment");
const Hotel = require("../models/Hotel");

const hotelsInDb = async () => {
  const hotels = await Hotel.find({});
  return hotels.map((h) => h.toJSON());
};

module.exports = {
  hotelsInDb,
};

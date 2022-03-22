const Hotel = require("../../models/Hotel");
const mongoose = require("mongoose");
const config = require("../../utils/config");
const logger = require("../../utils/logger");
const { seedHotels } = require("./mock_data");

mongoose
  .connect(config.MONGODB_URI)
  .then((res) => {
    logger.info("connected to mongodb");
  })
  .catch((err) => {
    logger.error("error connecting to mongodb", err.message);
  });

const seedDB = async () => {
  await Hotel.deleteMany({});
  await Hotel.insertMany(seedHotels);
};

seedDB().then(() => {
  mongoose.connection.close();
});

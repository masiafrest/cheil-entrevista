const hotelRouter = require("express").Router();
const Hotel = require("../models/Hotel");

hotelRouter.get("/", async (req, res, next) => {
  try {
    const { rating, category, priceOrderBy } = req.query;
    const filter = {};
    if (rating) filter["comments.rating"] = Number(req.query.rating);
    if (category) filter.category = category;
    console.log(req.query, filter);
    const hotels = await Hotel.find(filter)
      .sort({
        price: priceOrderBy || "asc",
      })
      .populate("comments");
    res.json(hotels);
  } catch (error) {
    next(error);
  }
});

hotelRouter.get("/:id", async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate("comments");
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
});

hotelRouter.post("/:id/comment", async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json("hotel dont exist");
    }
    console.log(req.body);
    const newComment = { ...req.body, user: req.body.user || "anonymous" };
    hotel.comments = hotel.comments.concat(newComment);
    await hotel.save();

    res.status(201).json(hotel);
  } catch (err) {
    next(err);
  }
});

hotelRouter.post("/", async (req, res, next) => {
  try {
    const hasHotel = await Hotel.findOne({ name: req.body.name });
    if (hasHotel) {
      return res.status(400).json("hotel name already exist");
    }
    const newHotel = new Hotel({ ...req.body });
    const hotel = await newHotel.save();

    res.status(201).json(hotel);
  } catch (err) {
    next(err);
  }
});

hotelRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const hotel = await Hotel.findById(id);
    if (hotel._id.toString() === id) {
      await Hotel.findByIdAndRemove(id);
      return res.status(204).end();
    }
    res.status(403).json({ error: "hotel dont exist " });
  } catch (error) {
    next(error);
  }
});

hotelRouter.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedhotel = await Hotel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.json(updatedhotel);
  } catch (error) {
    next(error);
  }
});

module.exports = hotelRouter;

const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const url = "/api/hotel";

const { hotelsInDb } = require("./test_helpers");
const Hotel = require("../models/Hotel");

describe("si inicialmente hay un hotel en la bd", () => {
  beforeEach(async () => {
    await Hotel.deleteMany({});
    const hotel = new Hotel({
      name: "sherato",
      category: 1,
      price: 10,
      images: ["https://via.placeholder.com/150"],
    });
    await hotel.save();
  });

  const newHotel = {
    name: "GokuINN",
    category: 2,
    price: 20,
    images: ["https://via.placeholder.com/150"],
  };

  test("crear nuevo hotel", async () => {
    const hotelsAtStart = await hotelsInDb();

    await api
      .post(url)
      .send(newHotel)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const hotelsAtEnd = await hotelsInDb();

    expect(hotelsAtEnd).toHaveLength(hotelsAtStart.length + 1);
    const hotelNames = hotelsAtEnd.map((hotel) => hotel.name);
    expect(hotelNames).toContain(newHotel.name);
  });

  test("creacion fallido con statusCode 400 y mensaje si el hotel name ya esta en uso", async () => {
    const hotelsAtStart = await hotelsInDb();
    const hotel = { ...newHotel, name: "sherato" };

    await api
      .post(url)
      .send(hotel)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const hotelsAtEnd = await hotelsInDb();
    expect(hotelsAtEnd).toEqual(hotelsAtStart);
  });

  test("borrar un hotel ", async () => {
    const res = await api
      .post(url)
      .send(newHotel)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const id = res.body.id;
    await api.delete(`${url}/${id}`).expect(204);
  });

  test("actualizar un hotel", async () => {
    const res = await api.post(url).send(newHotel);

    const id = res.body.id;
    const name = "nuevo nombre";
    const updatedHotel = { name };
    const updResult = await api
      .put(`${url}/${id}`)
      .send(updatedHotel)
      .expect(200);

    expect(updResult.body.name).toContain(name);
  });

  test("post a comentario a un hotel", async () => {
    const res = await api.post(url).send(newHotel);
    const id = res.body.id;

    const updatedHotel = { comment: "nuevo commentario", rating: 4 };
    const updResult = await api
      .post(`${url}/${id}/comment`)
      .send(updatedHotel)
      .expect(201);

    expect(updResult.body.comment).toContain(updatedHotel.comment);
  });
});

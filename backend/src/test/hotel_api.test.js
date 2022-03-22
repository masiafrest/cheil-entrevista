const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const url = "/api/hotel";

const { hotelsInDb } = require("./test_helpers");
const Hotel = require("../models/Hotel");
const { seedHotels } = require("./seed/mock_data");

describe("si inicialmente hay un hotel en la bd", () => {
  beforeEach(async () => {
    await Hotel.deleteMany({});
    await Hotel.insertMany(seedHotels);
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
    const hotel = { ...newHotel, name: seedHotels[0].name };

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

    expect(updResult.body.comments[0].rating).toBe(4);
  });
});

describe("filtrar hoteles", () => {
  beforeEach(async () => {
    await Hotel.deleteMany({});
    await Hotel.insertMany(seedHotels);
  });

  test("sin filtro", async () => {
    const res = await api.get(url);
    expect(res.body).toHaveLength(seedHotels.length);
  });

  test("por categoria", async () => {
    const category = seedHotels[0].category;
    const res = await api.get(`${url}?category=${category}`);
    expect(res.body[0].category).toBe(category);
  });

  test("por rating", async () => {
    const hotels = await api.get(`${url}`);
    const id = hotels.body[0].id;
    const id2 = hotels.body[1].id;
    const id3 = hotels.body[2].id;

    const newComment = { comment: "nuevo commentario", rating: 4 };
    const newComment2 = { comment: "segundo comentario", rating: 3 };
    const newComment3 = { comment: "tercero commentario", rating: 2 };

    await api.post(`${url}/${id}/comment`).send(newComment).expect(201);
    await api.post(`${url}/${id2}/comment`).send(newComment2).expect(201);
    await api.post(`${url}/${id3}/comment`).send(newComment3).expect(201);

    const res2 = await api.get(`${url}?rating=${4}`);
    expect(res2.body[0].comments[0].rating).toBe(4);
  });
});

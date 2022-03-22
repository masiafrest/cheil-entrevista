const hotelsName = ["Veggeta", "Nappa", "Picollo", "Krilin", "Yamcha", "Bulma"];

const images = [
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
];

const seedHotels = [];
for (let i = 0; i < hotelsName.length; i++) {
  const category = Math.floor(Math.random() * 5) + 1;
  const hotel = {
    name: hotelsName[i],
    category,
    price: (i + 1) * 10 * category,
    images,
  };
  seedHotels.push(hotel);
}

module.exports = { seedHotels };

import cities from "all-the-cities";

export default function handler(req, res) {
  const { cityId } = req.query;
  const [city] = cities.filter((city) => city.cityId === Number(cityId));
  res.status(200).json(city);
}

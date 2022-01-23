import cities from "all-the-cities";

export default function handler(req, res) {
  const { cityId } = req.query;
  const [city] = cities.filter((city) => city.cityId === Number(cityId));
  if (!city) {
    res.status(404).json(null);
    return;
  }
  res.status(200).json(city);
}

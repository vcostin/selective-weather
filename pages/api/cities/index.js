import cities from "all-the-cities";
import naturalCompare from "string-natural-compare";

export default function handler(req, res) {
  res.status(200).json(
    cities
      .map(({ name, cityId }) => ({ value: cityId, label: name }))
      .sort((a, b) => naturalCompare(a.label, b.label))
      .slice(0, 100)
  );
}

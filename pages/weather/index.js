import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from "react-select";
import WeatherWidget from "../../src/features/weather/WeatherWidget";
import styles from "../../styles/Weather.module.css";

export default function Weather() {
  const router = useRouter();
  const [cities, setCities] = useState([]);
  useEffect(() => {
    fetch(`/api/cities`)
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Select
        onChange={(e) => router.push(`/weather/${e.value}`)}
        options={cities}
      />
      <WeatherWidget cityName="Chisinau" />
    </div>
  );
}

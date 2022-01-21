import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from "react-select";
import WeatherWidget from "../../src/features/weather/WeatherWidget";
import styles from "../../styles/Weather.module.css";

export default function Weather() {
  const router = useRouter();
  const { cityId } = router.query;
  const [cityData, setCityData] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    console.log(cityData);
  }, [cityData]);

  useEffect(() => {
    if (!cityId) {
      return;
    }
    fetch(`/api/cities/${cityId}`)
      .then((res) => res.json())
      .then((data) => {
        setCityData(data);
      });
  }, [cityId]);

  useEffect(() => {
    fetch(`/api/cities`)
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
      });
  }, []);

  return (
    <div className={styles.container}>
      {Boolean(cityData) && (
        <>
          <Select
            defaultValue={{ value: cityData.value, label: cityData.name }}
            //defaultInputValue={cityData.name}
            onChange={(e) => {
              console.log(e);
              router.push(`/weather/${e.value}`);
            }}
            options={cities}
            //autoFocus
            //hasValue={true}
          />
          <WeatherWidget cityName={cityData.name} />
        </>
      )}
    </div>
  );
}

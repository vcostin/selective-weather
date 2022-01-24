import WeatherWidget from "../../src/features/weather/WeatherWidget";
import styles from "../../styles/Weather.module.css";

export default function Weather() {
  return (
    <div className={styles.container}>
      <WeatherWidget cityName="Chisinau" coordinates={[0,0]}/>
    </div>
  );
}

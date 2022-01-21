import styles from "./WeatherWidget.module.css";

const WeatherWidget = ({ cityName }) => {
  return <div className={styles.container}>{cityName}</div>;
};

export default WeatherWidget;

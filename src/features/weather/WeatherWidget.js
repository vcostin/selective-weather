import styles from "./WeatherWidget.module.css";

const WeatherWidget = ({ cityName, coordinates }) => {
  const [lat, long] = coordinates;
  return (
    <div className={styles.container}>
      <h1>{cityName}</h1>
      <div className="coordinates">
        <div className="latitude">
          <strong>lat: </strong>
          {lat}
        </div>
        <div className="longitude">
          <strong>long: </strong>
          {long}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;

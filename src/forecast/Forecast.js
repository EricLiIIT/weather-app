import Card from "../weather/Card";
const Forecast = (props) => {
  return (
    <div>
      <h1>Forecast component</h1>
      <p>{props.forecastMaxTemp}</p>
      <Card
        latitude={props.latitude}
        longitude={props.longitude}
        city={props.city}
        weatherCode={props.weatherCode}
        forecastMaxTemp={props.forecastMaxTemp}
      />
    </div>
  );
};

export default Forecast;

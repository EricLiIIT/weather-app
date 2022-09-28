import Card from "../weather/Card";
const Forecast = (props) => {
  return props.day.map((i, index) => (
    <div key={i}>
      <Card
        day={i}
        weather={props.weather}
        maxTemp={props.maxTemp[index]}
        minTemp={props.minTemp[index]}
        sunrise={props.sunrise[index]}
        sunset={props.sunset[index]}
        precipitation={props.precipitation[index]}
        weatherCode={props.weatherCode[index]}
      />
    </div>
  ));
};

export default Forecast;

export const Forecast2 = () => {
  return "Hello";
};

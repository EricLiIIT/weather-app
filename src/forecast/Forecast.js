import { Day } from "./Day";
import "./Forecast.css";
const Forecast = (props) => {
  function handleClick() {
    console.log("forecast item clicked");
  }
  return (
    <div className="forecast" onClick={handleClick}>
      <Day
        day={props.day}
        maxTemp={props.maxTemp}
        minTemp={props.minTemp}
        weatherCode={props.weatherCode}
      />
    </div>
  );
};

export default Forecast;

export const Forecast2 = () => {
  return "Hello";
};

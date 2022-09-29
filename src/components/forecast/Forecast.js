import { Day } from "./Day";
import "./Forecast.css";

const Forecast = (props) => {
  function handleClick(index) {
    props.handleSelectedDay(index);
  }

  return (
    <div className="forecast">
      <Day
        day={props.day}
        maxTemp={props.maxTemp}
        minTemp={props.minTemp}
        weatherCode={props.weatherCode}
        handleClick={handleClick}
      />
    </div>
  );
};

export default Forecast;

export const Forecast2 = () => {
  return "Hello";
};

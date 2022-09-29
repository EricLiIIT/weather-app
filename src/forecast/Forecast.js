import { Day } from "./Day";
import "./Forecast.css";
const Forecast = (props) => {
  return (
    <div className="forecast">
      <Day day={props.day} maxTemp={props.maxTemp} minTemp={props.minTemp} />
    </div>
  );
};

export default Forecast;

export const Forecast2 = () => {
  return "Hello";
};

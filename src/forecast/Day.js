export const Day = (props) => {
  console.log(props.day);
  function convertToDay(date) {
    const day = new Date(date).getDay();
    const daysOfTheWeek = {
      0: "Mon",
      1: "Tues",
      2: "Wed",
      3: "Thur",
      4: "Fri",
      5: "Sat",
      6: "Sun",
    };
    return daysOfTheWeek[day];
  }
  return props.day.map((i, index) => (
    <div className="day">{convertToDay(props.day[index])}</div>
  ));
};

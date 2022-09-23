export async function getWeatherData() {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=41.83&longitude=-87.62&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto";

  const response = await fetch(url);
  const data = await response.json();

  return data;
}

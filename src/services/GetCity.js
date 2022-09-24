export const geoDbCitiesApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "40bbdb1a69msh0243610abe4959ep1394eajsn827ce485fab4",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export async function getCityCoordinates(city) {
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1000000&namePrefix=${city.toString()}`;
  const response = await fetch(url, geoDbCitiesApiOptions);
  const data = response.json();

  return data;
}

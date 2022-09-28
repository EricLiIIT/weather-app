export const OPTIONS = {
  method: "GET",
  headers: {
    Authorization: "prj_test_pk_a39db1be79133f60d0d143694d6a329cd051a2e2",
  },
};

export async function getCityCoordinates(city) {
  const URL = `https://api.radar.io/v1/geocode/forward?query=${city.toString()}`;
  const response = await fetch(URL, OPTIONS);
  const data = response.json();
  return data;
}

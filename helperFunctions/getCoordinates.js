const axios = require("axios");
const getCoordinates = async (place) => {
  try {
    let fetchedData = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${place}&appid=${process.env.API_KEY}`
    );
    let { lat, lon } = fetchedData.data[0];
    return { data:{lat,lon},error:null };
  } catch (e) {
      return {data:null,error:'Try Another Location !'}
  }
};
module.exports = getCoordinates;

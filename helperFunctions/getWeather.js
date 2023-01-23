const axios = require("axios");
const getWeather = async (coordinates) => {
  try {
    let fetchedData = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${process.env.API_KEY}`
    );
    return {data:fetchedData,error:null};
  } catch (e) {
     return {data:null,error:'Something went wrong Please Try Again Later !'}
  }
};

module.exports = getWeather;

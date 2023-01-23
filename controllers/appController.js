const getCoordinates = require("../helperFunctions/getCoordinates");
const fetchWeather = require("../helperFunctions/getWeather");
const getWeather = async (req, res) => {
  let searchLocation = req.params.place;
  let coordinates = await getCoordinates(searchLocation);
  if (coordinates.error) {
    return res.status(500).json(coordinates.error);
  }
  let weather = await fetchWeather(coordinates.data);
  if (weather.error) {
    return res.status(500).json(weather.error);
  }
  res.status(200).send(weather.data.data);
};
module.exports = getWeather


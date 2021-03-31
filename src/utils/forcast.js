const request = require("request");

const forcast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=93f36cd80dc0ee8678c8b416bb2168be&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("unable to connect the weather service..", undefined);
    } else if (body.error) {
      callback("unable to find the location please try again..", undefined);
    } else {
      callback(
        undefined,
        `its ${body.current.weather_descriptions}. The current temperature is ${body.current.temperature} degrees and there are ${body.current.precip}% chances of Rain.The humidity is ${body.current.humidity}%.`
      );
    }
  });
};
module.exports = forcast;

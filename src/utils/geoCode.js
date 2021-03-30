const request = require("request");
const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicmVobWF0MDIzIiwiYSI6ImNrbWdsNmNqNDA4bnAyb3FwdXF2YTFtaHIifQ.RiKAK2dSyikgqSk3A9TDdw&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to geocoding service", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find the location search again..", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;

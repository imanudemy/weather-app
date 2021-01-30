const request = require("request");

const forecast = (latitude, longitude, callback) => {
  // const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude

  const url =
    "http://api.weatherstack.com/current?access_key=173b9cfb92b01486a31154bbd73cd48f&query=" +
    latitude +
    "," +
    longitude;

    console.log(url);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
        " it is currently " +
        body.current.temperature +
        " degress out. it feels like " +
        body.current.feelslike +
        " degress out"
      );
    }
  });
};

module.exports = forecast;

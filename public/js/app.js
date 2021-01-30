console.log("this js client side");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");

weatherForm.addEventListener("submit", (e) => {
  const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
messageOne.textContent = "Loading";
messageTwo.textContent = "";
  e.preventDefault();
  const location = search.value;
  // fetch("http://localhost:3000/weather?address=" + location).then(i
//  karena heroku maka digant
  fetch("/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
          messageTwo.textContent = "";
          console.log(data.error);
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forcast;
          console.log(data.location);
          console.log(data.forcast);
        }
      });
    }
  );
});

// fetch(
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/boston.json?access_token=pk.eyJ1IjoiaW1hbmoxMjMiLCJhIjoiY2traTlpYTRpMG85czMxb2Q1Yno0ZjVzeSJ9.CzKL2EyT913j-yFAbpAMEA&limit=1"
// ).then((response) => {
//   response.json().then((data) => {
//     console.log(data.features[0].center[1]);

//     const latitude = data.features[0].center[1];
//     const longitude = data.features[0].center[0];

//     const forcast =
//       "http://api.weatherstack.com/current?access_key=173b9cfb92b01486a31154bbd73cd48f&query=" +
//       latitude +
//       "," +
//       longitude;

//     fetch(forcast).then((response) => {
//       response.json().then((data) => {
//         // forcast: forcastData,
//         // location,
//         // address: req.query.address,
//         console.log(data.forcast);
//         console.log(data.location);
//         console.log(data.location);
//       });
//     });
//   });
// });

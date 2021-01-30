const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forcast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const app = express();

// node src/app.js cara running

// define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup hanlderbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Iman Jatnika",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Iman Jatnika",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    message: "this is help page",
    name: "Iman Jatnika",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forcast(latitude, longitude, (error, forcastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forcast: forcastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "help articles not found",
    name: "Iman Jatnika",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "page not found",
    name: "Iman Jatnika",
  });
});

// app.get('', (req, res) => {
//   res.send('<h1><weather /h1>');
// });

// app.get("/help", (req, res) => {
//   res.render({
//     hello: "hello",
//     iman: "iman",
//   });
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About</h1>");
// });

app.listen(3000, () => {
  console.log("server is up on port 3000");
});

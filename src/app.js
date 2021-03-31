const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forcast = require("./utils/forcast");

const app = express();

const port  = process.env.PORT || 3000;

//define paths for express config
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars  engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static dir to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather Application",
    name: "Rehmat Karim",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Rehmat Karim",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message:
      "I am here to help you out if you have any query kindly contact me.",
    title: "Help",
    name: "Rehmat Karim",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide the address",
    });
  }
  geoCode(req.query.address, (error, { latitude, longitude, location }={}) => {
    if (error) {
      return res.send({ error: error });
    }
    forcast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error: error });
      }
      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "help article not found",
    name: "Rehmat Karim",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page Not found",
    name: "Rehmat Karim",
  });
});

app.listen(port, () => {
  console.log("server is up on port"+port);
});

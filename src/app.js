const path = require("path");
const express = require("express");

const app = express();

//define paths for express config
const viewsPath = path.join(__dirname, "../templates");

//setup handlebars  engine and views location 
app.set("view engine", "hbs");
app.set("views", viewsPath);


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
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message:
      "I am here to help you out if you have any query kindly contact me.",
  });
});
app.get("/weather", (req, res) => {
  res.send({
    forcast: "its 45 degrees here",
    location: "Islamabad,Pakistan",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});

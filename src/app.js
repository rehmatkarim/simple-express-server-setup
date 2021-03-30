const path = require("path");
const express = require("express");
const hbs = require('hbs');

const app = express();

//define paths for express config
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");


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
    name:'Rehmat Karim'
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message:
      "I am here to help you out if you have any query kindly contact me.",
      title:'Help',
      name:'Rehmat Karim'
  });
});
app.get("/weather", (req, res) => {
  res.send({
    forcast: "its 45 degrees here",
    location: "Islamabad,Pakistan",
  });
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'help article not found',
        name:'Rehmat Karim'
    });
});
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'Page Not found',
        name:'Rehmat Karim'
    });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});

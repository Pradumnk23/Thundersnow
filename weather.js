const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})


app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apikey = "3cf85bb48f47cc585e132e42cab9acd8";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weaterData = JSON.parse(data);
            const temp = weaterData.main.temp;
            const description = weaterData.weather[0].description;
            const icon = weaterData.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently " + description + "<p>");
            res.write("<h1>The temperature in " +query+ " is " + temp + " degree Celcius.</h1>");
            res.write("<img src=" + imgurl + ">");
            res.send()
        })
    })

})

app.listen(3000, function () {
    console.log("Server is running on port 3000.");
})

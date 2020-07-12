//jshint esversion:6
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const express = require("express");
const bodyParser = require("body-parser"); // 界面传到后台
const ejs = require("ejs");
const https = require("https");
const path = require("path");
var pokeName = require('./data/pokeName.json');
const pokemon = require('pokemon');
const app = express();
app.use(express.static("public")); // css 路径包
app.set('view engine', 'ejs'); // ejs 引擎
app.use(bodyParser.urlencoded({
    extended: true
})); // 界面传到后台




app.get("/", function (req, res) {
    res.render("home", { pokeName: pokeName });
});


app.get("/post/:poNumber", function (req, res) {
    var reqPoNum = req.params.poNumber
    // console.log(typeof reqPoNum);


    var PokekeApi = "https://pokeapi.co/api/v2/pokemon/" + reqPoNum;
    let chunks = [];
    https.get(PokekeApi, function (response) {
        response.on("data", function (data) {
            chunks.push(data);

        }).on("end", function () {
            let data = Buffer.concat(chunks);
            let json = JSON.parse(data);
            res.render("post", {pokemonData:json, pokeName:pokeName});
        });
        
    });

});







app.listen(process.env.PORT || 3000, function () {
    console.log("localhost 3000");
});
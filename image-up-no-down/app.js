//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser"); // 界面传到后台
const ejs = require("ejs");
const mongoose = require("mongoose");
const multer = require("multer");
//var upload = multer({ dest: "public/uploads/" });
var path = require("path");


const app = express();

app.use(express.static("public")); // css 路径包
app.set('view engine', 'ejs'); // ejs 引擎
app.use(bodyParser.urlencoded({
    extended: true
})); // 界面传到后台



app.get("/", (req, res) => {
    res.render("home");
});

app.get("/img1.png", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/uploads/pic2.jpeg"));
});



// app.post('/profile', upload.single('avatar'), function(req, res, next) {
//     console.log(req.file.filename);
//     req.file.filename = "pictureOneTwoThree";
//     res.redirect("/");
// });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/avatars/')
    },
    filename: function (req, file, cb) {
        //console.log(req.body)
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });


app.post('/upload', (req, res) => {
    upload(req, res, function(err) {
        if(err) {
            //stuff when error while file uploading
        } else {
            //file uploaded
        }
    })
});






app.post("/", function(req, res) {

    var hm1 = req.body.firstName;
    var hm2 = req.body.lastName;

    console.log(hm1);
    console.log(hm2);


});

app.listen(3000, function() {
    console.log("localhost 3000");
});
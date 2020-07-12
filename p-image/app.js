//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser"); // 界面传到后台
const ejs = require("ejs");
const mongoose = require("mongoose");
mongoose.connect(MongoDB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });
const path = require("path");

const app = express();

app.use(express.static("public")); // css 路径包
app.set('view engine', 'ejs'); // ejs 引擎
app.use(bodyParser.urlencoded({
    extended: true
})); // 界面传到后台

//Schema for mongoDB

const sharedPicturesSchema = {
    file_name: String,
    pic_name: String
};

const SharedPictures = mongoose.model("SharedPictures", sharedPicturesSchema);
// [   sharedPictures  ] will be the modelName to search from the mongdb



app.get("/", (req, res) => {

    SharedPictures.find({}, function (err, foundPictures) {

        if (foundPictures.length === 0) {
            res.render("home", { foundPictures: foundPictures });
        } else {
            
            res.render("home", { foundPictures: foundPictures });
        }
    });
});

app.post("/delete", function (req, res) {

    const deleteName = req.body.deleteName;
    console.log(deleteName);

    SharedPictures.deleteOne({file_name: deleteName}, function (err) {
        if (!err) {
            console.log("Successfully deleted checked item.");
            res.redirect("/");
        }
    });

    // res.redirect("/");
});




app.get("/imgs/:fileAddress", (req, res) => {
    var storedFileName = req.params.fileAddress;


    res.sendFile(path.join(__dirname, "./public/uploads/" + storedFileName));

});



app.post('/upload', upload.single('avatar'), function (req, res, next) {

    // console.log(req.file.filename);
    // console.log(req.body.picName);



    const sharedPicture = new SharedPictures({
        file_name: req.file.filename,
        pic_name: req.body.picName
    });
    sharedPicture.save();
    res.redirect("/");
});






app.listen( process.env.PORT || 3000, function () {
    console.log("localhost 3000");
});
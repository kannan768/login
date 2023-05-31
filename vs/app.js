var express = require("express");
var bodyParse = require("body-parser");
var mongoose = require("mongoose");
const e = require("express");
//let alert=require('alert');
// var popup=require('popups');



const app = express()

app.use(bodyParse.json())
app.use(express.static('public'))
app.use(bodyParse.urlencoded({
    extended: true
}))




mongoose.connect('mongodb://0.0.0.0:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var db = mongoose.connection;



db.on('error', () => console.log("error in connecting database"));
db.once('open', () => console.log("Connected to Database"));


app.get("/", (req, res) => {

    res.set({
        "Allow-access-Allow-Origin": '*'
    })

    return res.redirect('index.html');

}).listen(3000);



app.post("/login", async (request, response) => {
    try {

        //adding

        const username = request.body.username;

        const password = request.body.password;




        const usermail = db.collection('users').findOne({ username: username }, (err, res) => {

            if (res==null) {

            
                return response.redirect('AccountError.html');
               
                
            }

            else if (err) throw err;





            if (res.password === password) {

                return response.redirect('login.html');

            }

            else {

                return response.redirect("PasswordError.html");
              //  alert("Incorrect password")

            }





        });

    }

    catch (error) {

        response.send("Invalid information");

    }

})
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt')
const generatePassword = require('password-generator');
const app = express();
const conn = require('./db/conn')
const userSignup = require('./models/usersignup')
const prompt = require('prompt');
prompt.start();
const port = process.env.PORT || 500;

// express related codes 
app.use(express.urlencoded()) // get post data from form to express

//routes
const staticPath = path.join(__dirname, "../static")
const viewsPath = path.join(__dirname, "../templates/views")
app.use(express.static(staticPath))



app.get('/', function (req, res) {
    res.sendFile(viewsPath + "/login.html")
    // res.render("login")
})
app.get('/home', function (req, res) {
    res.sendFile(viewsPath + "/home.html")
    // res.render("login")
})
app.get('/about', function (req, res) {
    res.sendFile(viewsPath + "/about.html")
    // res.render("login")
})
app.get('/contact', function (req, res) {
    res.sendFile(viewsPath + "/contact.html")
    // res.render("login")
})

// --------------------------Sign up data of new user------------------------------------
app.post('/signup', function (req, res) {
    try {
        var userData = new userSignup({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            email: req.body.email,
            password: req.body.password
        })
        console.log(userData.password)
        securePassword(userData.password);
        async function securePassword(pass) {
            const passwordHash = await bcrypt.hash(pass, 10)
            // console.log(passwordHash);
            userData.password = passwordHash
            userData.save().then(() => {
                res.status(201).sendFile(viewsPath + "/home.html")

            }).catch((err) => {
                res.send("Email already exist !")
                console.log(err)
            })

            // }
            // res.send(userData);

        }
    }
    catch (err) {
        res.status(404).send(err);
    }

})

// --------------------------login existing user------------------------------------

app.post("/login", async (req, res) => {
    try {
        var email = req.body.email;
        var password = req.body.password;
        var userData = await userSignup.findOne({ email: email }); // check if entered email is in the db
        var pass = await bcrypt.compare(password, userData.password)
        // console.log(pass);
        if (pass) {
            res.status(201).sendFile(viewsPath + "/home.html")
        }
        else {
            res.send("Invalid login details")
        }
    } catch (error) {
        res.send(`Email not available: ${error}`)
    }
})
// --------------------------Forgot password------------------------------------

app.post('/fpass', async (req, res) => {


    var email = req.body.email;
    var userData = await userSignup.findOne({ email: email });
    if (userData == null) {
        res.send(`Email not found in db`)
    }
    else {
        newPassword = generatePassword(12, false);
        try {
            const passwordHash = await bcrypt.hash(newPassword, 10)
            // console.log(passwordHash);
            await userSignup.updateOne({ email: email }, { $set: { password: passwordHash } })
            res.send(`Password stored in db ! your new password is ${newPassword}`)
        } catch (error) {
            res.send(`Password not stored in db: ${error}`)

        }
    }





    // res.render("login")
})



app.listen(port, () => {
    console.log(`This app is listening at ${port}`)
})




//code to use render to send HTML file
// const cons = require('consolidate')
/*app.engine('html', cons.swig)
app.set("views",path.join(__dirname,"../templates/views"))
 app.set("view engine","html") */
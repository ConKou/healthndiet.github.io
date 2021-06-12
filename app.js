//IMPORTS
const express = require('express')
const app = express()
var path = require('path');


//STATIC FILES
app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'));
app.use('/js',express.static(__dirname + 'public/src'));
app.use('/images',express.static(__dirname + 'public/css'));
app.get('' , (req, res) =>{ 
  res.sendFile(__dirname + '/layout/index.html')
})
app.get('/layout/index.html' , (req, res) =>{ 
  res.sendFile(__dirname + '/layout/index.html')
})
app.get('/layout/services.html', (req, res) =>{ 
  res.sendFile(__dirname + '/layout/services.html')
})
app.get('/layout/articles.html', (req, res) =>{ 
  res.sendFile(__dirname + '/layout/articles.html')
})
app.get('/layout/diets.html', (req, res) =>{ 
  res.sendFile(__dirname + '/layout/diets.html')
})
app.get('/layout/bookonline.html', (req, res) =>{ 
  res.sendFile(__dirname + '/layout/bookonline.html')
})
app.get('/action_page.php' , (req, res) =>{ 
 
})

const exphbs                = require("express-handlebars"),
      mongoose              =  require("mongoose"),
      passport              =  require("passport"),
      bodyParser            =  require("body-parser"),
      LocalStrategy         =  require("passport-local"),
      passportLocalMongoose =  require("passport-local-mongoose"),
      User                  =  require("./models/user");


//Connecting database
mongoose.connect("mongodb://localhost/auth_demo",{useNewUrlParser: true, useUnifiedTopology: true });

app.use(require("express-session")({
    secret:"Any normal Word",       //decode or encode session
    resave: false,          
    saveUninitialized:false    
}));

passport.serializeUser(User.serializeUser());       //session encoding
passport.deserializeUser(User.deserializeUser());   //session decoding
passport.use(new LocalStrategy(User.authenticate()));
app.engine("hbs",exphbs({
      extname: "hbs",
      defaultLayout: false
    })
  );
// app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set("view engine","hbs");
app.use(bodyParser.urlencoded(
      { extended:true }
))
app.use(passport.initialize());
app.use(passport.session());

//=======================
//      R O U T E S
//=======================
app.use(express.static(__dirname + '/public'));

app.get("/", (req,res) =>{
    res.render("home");
})

app.get("/userprofile",isLoggedIn ,(req,res) =>{
    res.render("userprofile");
})
//Auth Routes
app.get("/login",(req,res)=>{
    res.render("login");
});

app.post("/login",passport.authenticate("local",{
    successRedirect:"/userprofile",
    failureRedirect:"/login"
}),function (req, res){

});

app.get("/register",(req,res)=>{
    res.render("register");
});

app.post("/register",(req,res)=>{
    if(req.body.username === '' || req.body.password === '' || req.body.phone === '' || req.body.email === ''  ){
        res.redirect("/register");
        

    } 
    else{
        User.register(new User({username: req.body.username,phone:req.body.phone,email: req.body.email}),req.body.password,function(err,user){
            if(err){
                console.log(err);
                res.render("register",{
                    message: 'That username is already in use'
             });
          }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/login");

          });
        }
    
    
    })
}    
    })


app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


//Listen On Server


app.listen(process.env.PORT ||3000,function (err) {
    if(err){
        console.log(err);
    }else {
        console.log("Server Started At Port 3000");
    }
      
});

const express = require("express");
const moongose = require ("mongoose");
const cors = require('cors');
const app = express();
const nodemailer = require('nodemailer')
const {google} = require('googleapis')


const clientID = '220175093383-fre68bcsv8blhguh1taf81ik37vns0r4.apps.googleusercontent.com'
const clientSecret = 'D0C9u6kjftl7qyeOkkEjdyx2'
const redirectURI = 'https://developers.google.com/oauthplayground'
const refreshToken = '1//04scnMubMdcZCCgYIARAAGAQSNgF-L9IrXUes_sG_82d9LAKb_wfOFCiLRqm0llfXros5NGmnMFWSBBla1GCJwMKAq2Cx_CJnog'

const oAuth = new google.auth.OAuth2(clientID, clientSecret, redirectURI)

oAuth.setCredentials({refresh_token: refreshToken})


const CourseModel = require("./models/Course");
const UserModel = require("./models/User");

app.use(express.json());    
app.use(cors());





var popularLimit = 20;


function badTokenGen(size){
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];  
    for (var i=0; i<size; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}


const sendVerificationEmail = async (verificationToken, userEmail)=>{
    try{
        const accessToken = await oAuth.getAccessToken()
        const transport = nodemailer.createTransport({service: 'gmail', auth: {type: 'OAuth2', user: 'courseconnected@gmail.com', clientId: clientID, clientSecret : clientSecret, refreshToken: refreshToken, accessToken: accessToken}});  
        const options = {from: 'CourseConnected Auth <courseconnected@gmail.com>', to: userEmail, subject: "Verification Code", text: verificationToken};
        const result = transport.sendMail(options);
    }
    catch (error){
        return error
    }
}



app.put("/unitAdd", async (req, res)=>{
    const _id = req.body._id;
    const newUnit = req.body.unit;  
    try
    {
        await CourseModel.findById(_id, (err, newUnitCreation)=>{
        newUnitCreation.unit = newUnit;
        newUnitCreation.save();
        });
    }catch(err){
    }
})


app.put("/rStatus", async (req, res)=>{ // fetching data from frontend

    const newRating = req.body.rating;
    const newRates = req.body.rates;
    const _id = req.body._id;
    try
    {
        await CourseModel.findById(_id, (err, newRatedCourse)=>{
        newRatedCourse.rates = newRates;
        newRatedCourse.rating = newRating;
        newRatedCourse.save();
        });
    }catch(err){
        //console.log(err); 
    }
})

app.put("/cStatus", async (req, res)=>{ // fetching data from frontend

    const newCreated = req.body.created;
    const _id = req.body._id;
    try
    {
        await UserModel.findById(_id, (err, newCreatedUser)=>{
        newCreatedUser.created = newCreated;
        newCreatedUser.save();
        });
    }catch(err){
        //console.log(err); 
    }
})

app.put("/bStatus", async (req, res)=>{ // fetching data from frontend

    const newBookmarked = req.body.bookmarked;
    const _id = req.body._id;
    console.log(_id);
    try
    {
        await UserModel.findById(_id, (err, newBookmarkedUser)=>{
        newBookmarkedUser.bookmarked = newBookmarked;
        newBookmarkedUser.save();
        console.log(newBookmarkedUser.bookmarked);
        });
    }catch(err){
        //console.log(err); 
    }
})


app.post("/login", async (req, res) =>{  //check if an account exists
    const email = req.body.email;
    const password = req.body.password;
    UserModel.find({email: email, password: password}, (err, result)=>{
        if(err){    
            res.send(err);
        }
        if(result){
        res.send(result);}
        else{   
            res.send("Wrong information")
        }
    })
})




app.get('/fullDB', async (req, res)=>{
    CourseModel.find().exec(function(err, member){
        res.send(member);
    });
})



//CourseModel.find().sort({"rating": -1});
app.get('/popular', async (req, res)=>{
    CourseModel.find().sort({"rating": -1}).limit(popularLimit).exec(function (err, member) {
        res.send(member);
      })

})



app.post('/courseData', async (req, res) =>{
    const _id = req.body._id;
    CourseModel.findById(_id, (err, result)=>{
        res.send(result); 
    })
})

app.post('/bookmark', async (req, res) =>{
    const _id = req.body._id;
    UserModel.findById(_id, (err, result)=>{
        res.send(result);       
    })
})



app.post ('/signup', async(req, res) =>{
    const user = req.body.user;
    const user2 = new UserModel({user})
    await user2.save();
    res.send("registered user");
})

app.post('/register', async (req, res) =>{//authenticating and fetching user login from frontend
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    badToken = badTokenGen(5);
    console.log(badToken);
    UserModel.find({email: email}, (err, result) =>{
        if(result==0)
        {
            var seconds =Math.floor(Date.now()/1000);
            badToken+=seconds.toString(36);
            sendVerificationEmail(badToken, email);
            const user = new UserModel({username: username, password: password, email: email, verCode:badToken});
            res.send({user})
        }
        else{
            res.send(0)
        }
    });
});



app.post("/insert", async (req, res)=>{ // fetching data from frontend
    const imgURL = req.body.imgURL;
    const title = req.body.title; 
    const subject = req.body. subject; 
    const  author = req.body.author;
    const  description = req.body.description;
    const  level = req.body. level;
    const dateOfCreate =  req.body.dateOfCreate;
    const unit = req.body.unit;
    const createdBy = req.body.createdBy;
    const course = new CourseModel({title: title, subject: subject, author: author, description:description, level: level, dateOfCreate:dateOfCreate, unit: unit, imgURL:imgURL, createdBy: createdBy});
    try
    {
        await course.save();
        res.send(course._id);

    }catch(err){
    }
}); 

app.get("/read", async (req, res)=>{//reading from database
   CourseModel.find({}/*looking in database*/, (err, result) => {
       if(err){
        res.send(err)
       }
       res.send(result);
   })
});

app.put("/update", async (req, res)=>{ // fetching data from frontend
    const newTitle = req.body.newTitle; 
    const id = req.body.id;
 //  const subject = req.body. subject; 
 //  const  author = req.body.author;
 //  const  description = req.body.description;
 //  const  level = req.body. level;
 //  const dateOfCreate =  req.body.dateOfCreate;
 //  const unit = req.body.unit;
    try
    {
        await CourseModel.findById(id, (err, newDBAddition)=>{
            if(err)
            {
//console.log(err);
            }
            newDBAddition.title = newTitle;
            newDBAddition.save();
            res.send("worked")
        });

    }catch(err){
       // console.log(err);
    }
}); 

app.listen(3001, ()=> {
  //  console.log('Server up and running on 3001');
});
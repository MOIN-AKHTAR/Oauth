import express from "express";
import path from "path";
import passport from "passport";
import "./middlewares/passportGoogle"



const app=express();
app.use(express.json({}));
app.use("/static",express.static(path.join(__dirname, 'public')));

// Initialize/Setup passport speifically passport sessions-
app.use(passport.initialize())


// This is the url which on front end we give as href to anchor tag-
// Since we register our app with http://localhost:5000   as front end origin 
// So google will take us to signin with google page-
// This will not execute google strategy untill we not give our credentials-
// Once we give our credentials and google decides that these credentials are correct or not-
// If correct It will take us to callBackUrl given in google strategy middleware-
// Our google strategy is define inside middleswares/passportGoogle.js file-
// There we have given callbackurl which is route of our server-i.e:/auth/google/callback
// On /auth/google/callback route we define two more routes-
   //1. successRedirect ==> Which will be called when we login successfully-
  //2.  failureRedirect ===> Which will be called when we our login fails-  
app.get("/google/auth",passport.authenticate("google",{
    // This array is telling what we want from our google profile
    // Here we accessing profile and email of user account-
    scope:["profile","email"]
}));


// This is the callbackul which will be called either we successfully login or not from our after google strategy middleware runs-
// Here google decide based on the action whether we success fully login or not-
// If we successfully login than google will redirect us to successRedirect url-Here it is http://localhost:5000/static which is index.html file served on this url-
// If we unsuccessful in login the google will take us to failureRedirect url-
// session:false property telling we are not interested in storing session on buser's browser-
// NOTE:-
// It is not necessary that app and server should run on same domain say http://localhost:5000 here we serving our index.html file and also running our express server-
// If we are on different domain say frontend on http://localhost:3000 and server on http://localhost:5000 so we can redirect to http://localhost:3000/login page or in case of failue-
// Or incase of failure we can also specify like http://localhost:3000/failure page-
app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"/static",
    failureRedirect:"/failure",
    session:false
}))
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})




// IN SIMPLE PASSPORTJS WORK FLOW
// ->google/auth-->Take us to google sign in page- -->Google Strategy Middleware Will Be Execute --> Then Callback function Of Google Strategy Middleware Will Run-
// Which is (accesstoken.refreshtoken,profile)-
// Inside Google Middleware Function i.e:(accesstoken.refreshtoken,profile,cb) we call cb-
// cb(null,profile) ==>Success ---> Serialize User If Session Is enabled --->Callbackurl will be called after Serializing User-
// cb(error,null) ==>Failed
// Then callBackUrl will be called-There if cb is successful will redirect to succesfullRedirect route else failureRedirect route-
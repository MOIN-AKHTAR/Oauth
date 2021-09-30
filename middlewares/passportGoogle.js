import {Strategy} from "passport-google-oauth20";
import passport from "passport";
import dotEnv from "dotenv";
dotEnv.config({
    path:".env"
})

 
passport.use(new Strategy({
    // Client Id and Clientsecret keys will let us to interact our local server with the google's server-
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    // This will be called once we provided our credential then decision will be taken on /auth/google/callback url which is a route of our local server-
    // Before going to /auth/google/callback it will enter into (accessToken, refreshToken, profile, cb) function-
    callbackURL: "/auth/google/callback"
  },
//   This function called after our login successfull or unsuccesfull here we decide what we have to do with user's data-
// This is the perfect place for stoing this user in our db-
// cb(null,profile) ==> Represents successfull login-
// cb(error,null) ==> Represents not successful login-
  function(accessToken, refreshToken, profile, cb) {
   console.log("Access Token");
   console.log(accessToken);
   console.log("Refresh Token");
   console.log(refreshToken);
   console.log("Profile");
   console.log(profile);
   cb(null,profile);
  }
));
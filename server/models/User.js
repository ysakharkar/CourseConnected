   const mongoose = require ("mongoose");
   const UserSchema = new mongoose.Schema({
   username: {
       type: String,
       required: false,
   },
   password: {
       type: String,
       required: false,
   },
   email: {
       type: String,
       required: false,
   },
   bookmarked:{
       type: Array, String,
       required: false,
   },
   created:{
       type: Array, String, 
       required: false,
   },
   key:{
       type: String,
       required:false,
   },
   confirmed:{
       type: Boolean,
       required: false,
   },
   verCode: {
       type: String,
       required: false,
   }
   });

   userDb = mongoose.createConnection("mongodb+srv://EduDefault:OnlyLetters@eduapp.zoxor.mongodb.net/User?retryWrites=true&w=majority", {useNewUrlParser:true});


   const User = userDb.model("User", UserSchema);
   module.exports = User;
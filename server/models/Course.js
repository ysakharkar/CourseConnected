const mongoose = require ("mongoose");

const CourseSchema = new mongoose.Schema({
    rating:{
        type: Number,
        required: false,
        default:0,
    },
    rates:{
        type: Array,
        required: false,
    },
   title: {
       type: String,
       required: false,
   },
   subject: {
       type: String,
       required: false,
   },
   author: {
       type: String,
       required: false,
   },
   description: {
       type: String,
       required: false,
   },
   level: {
       type: Number,
       required: false,
   },
   dateOfCreate: {
       type: String,
       required: false,
   },
   imgURL :{
       type: String,
       required: false
   },
   unit: {
       type: Array, Object,
       required: false,
   },
   createdBy:{
       type: String,
       required: false
   }
});


cDb= mongoose.createConnection("mongodb+srv://EduDefault:OnlyLetters@eduapp.zoxor.mongodb.net/course?retryWrites=true&w=majority", {useNewUrlParser:true});

const Course = cDb.model("Course", CourseSchema);

module.exports = Course;
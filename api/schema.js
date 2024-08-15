const mongoose=require('mongoose')
const Schema= new mongoose.Schema({//Constructor
    title:String,
    content:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
});
const UserModel = mongoose.model('Note', Schema);


module.exports = UserModel;

const mongoose=require('mongoose');
const { boolean } = require('webidl-conversions');

let url="mongodb://localhost:27017/mental-health"
mongoose.connect(url);
let table=new mongoose.Schema({
    name:String,
    password:String,
    id:String,
    verify:Boolean
});
let student=mongoose.model('student' , table);
let teacher =mongoose.model('teacher',table);
let ad=new mongoose.Schema({
    id:String,
    password:String
});
let admin=mongoose.model('admin',ad);
let mess=new mongoose.Schema({
    tid:String,
    sid:String,
    message:Array,
    
})
let message=mongoose.model('message',mess);
module.exports={student,teacher,admin,message};
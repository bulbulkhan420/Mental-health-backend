let {student,teacher,admin,message}=require('./Database');
let messagelist=async(req,res)=>{
    let {tid,sid}=req.body;
   let p=await message.findOne({tid,sid});
   
   if(p){
    res.json({
        ok:true,
        list:p.message
       })
   }
   else{
    res.json({
        ok:false
    })
   }
   
}
let sendstudent=async(req,res)=>{
    let {tid,sid,mess}=req.body;
    let v=await message.findOne({tid,sid});
    if(v){
        await message.findOneAndUpdate({tid,sid},{$set:{message:mess}});
    }
    else{
        await message.insertMany([{tid,sid,message:mess}])
    }
    
    let p=await message.findOne({tid,sid});
    
    console.log(v);
    res.json({
        ok:true,
        student:p.message,
      
    })
}
let sendteacher=async(req,res)=>{
    let {tid,sid,mess}=req.body;
    let v=await message.findOne({tid,sid});
    if(v){
        await message.findOneAndUpdate({tid,sid},{$set:{message:mess}});
    }
    else{
        await message.insertMany([{tid,sid,message:mess}])
    }
    
    let p=await message.findOne({tid,sid});
    
    console.log(v);
    res.json({
        ok:true,
        teacher:p.message,
       
    })
}
let studentlist=async(req,res)=>{
    let id=req.params.id;
    let v=await message.find({tid:id});
    if(v){
        res.json({
            ok:true,
            list:v
        })
    }
}
module.exports={messagelist,sendstudent,sendteacher,studentlist};
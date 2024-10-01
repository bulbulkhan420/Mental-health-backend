let {student,teacher,admin}=require('./Database');
let bcrypt=require('bcryptjs');
let jwt=require('jsonwebtoken');
let main=(req,res)=>{
    res.send("hello sabbir bro");
}
let registration= async (req,res)=>{
        let person=req.params.person;
        
        let maindata=req.body;
        let v;
        if(person=="Student"){
            v=await student.findOne({id:maindata.id});
        }
        else{
            v=await teacher.findOne({id:maindata.id});
        }
        if(!v){
             maindata.password=await bcrypt.hash(maindata.password,10);
            if(person=="Student"){
                await student.insertMany([{id:maindata.id,name:maindata.fname+" "+maindata.lname,password:maindata.password,verify:false}]);
            }
            else{
                await teacher.insertMany([{id:maindata.id,name:maindata.fname+" "+maindata.lname,password:maindata.password,verify:false}]);
            }
            res.json({
                ok:true
            })
        }
        else{
            res.json({
                ok:false
            })
        }
   

}
let login=async (req,res)=>{
  let person=req.params.person;
  
  let data=req.body;
  if(person=="student"){
    let re=await student.findOne({id:data.id,verify:true});
    if(re){
        bcrypt.compare(data.password,re.password,(er,val)=>{
            if(val){
             let token=jwt.sign({name:re.name,id:re.id},'bdudi743737dhjj^^%7wujx',{expiresIn:'100d'});
             res.json({
                ok:true,
                person:'Student',
                token:token,
                id:re.id
             })
            }
            else{
                res.json({
                    ok:false
                })
            }
        })
    }
    else{
        res.json({
            ok:false
        })
    }
   
  }
  else if(person=="admin"){
    let re=await admin.findOne({id:data.id});
    if(re){
        bcrypt.compare(data.password,re.password,async (er,val)=>{
            if(val){
             let token=jwt.sign({id:re.id},'bdudi743737dhjj^^%7wujx',{expiresIn:'100d'});
             res.json({
                ok:true,
                person:'Admin',
                token:token,
               
             })
            }
            else{
                res.json({
                    ok:false
                })
            }
        })
    }
    else{
        res.json({
            ok:false
        })
    }
  }
  else{
     

    let re=await teacher.findOne({id:data.id,verify:true});
    if(re){
        bcrypt.compare(data.password,re.password,(er,val)=>{
            if(val){
             let token=jwt.sign({name:re.name,id:re.id},'bdudi743737dhjj^^%7wujx',{expiresIn:'100d'});
             res.json({
                ok:true,
                person:'Teacher',
                token:token,
                id:re.id
             })
            }
            else{
                res.json({
                    ok:false
                })
            }
        })
    }
    else{
        res.json({
            ok:false
        })
    }
  }
}

let getstudent=async (req,res)=>{
    let {name,id}=req.body;
    let v=await student.findOne({id,name});
    if(v){
        res.json({
            ok:true,
            info:v
        })
    }
    else{
        res.json({
            ok:false
        })
    }
}
let getteacher=async (req,res)=>{
    let {name,id}=req.body;
    let v=await teacher.findOne({id,name});
    if(v){
        res.json({
            ok:true,
            info:v
        })
    }
    else{
        res.json({
            ok:false
        })
    }
}
let getadmin=async (req,res)=>{
 let st=await student.find({verify:false});
 let te=await teacher.find({verify:false});
 res.json({
    ok:true,
    student:st,
    teacher:te
 })
}
let astudent=async (req,res)=>{
    let id=req.params.id;
    await student.findOneAndUpdate({id},{$set:{verify:true}});
    res.json({
        ok:true
    });
}
let rstudent=async (req,res)=>{
    let id=req.params.id;
    await student.findOneAndDelete({id});
    res.json({
        ok:true
    });
}
let ateacher=async (req,res)=>{
    let id=req.params.id;
    await teacher.findOneAndUpdate({id},{$set:{verify:true}});
    res.json({
        ok:true
    });
}
let rteacher=async (req,res)=>{
    let id=req.params.id;
    await teacher.findOneAndDelete({id});
    res.json({
        ok:true
    });
}
module.exports={main,registration,login,getstudent,getteacher,getadmin,astudent,ateacher,rteacher,rstudent};
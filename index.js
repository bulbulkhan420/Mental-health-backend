const express=require('express');
let cors=require('cors');
let env=require('dotenv').config();
let app=express();
let {route}=require('./router.js');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(route);

app.listen(8000,(er)=>{
    console.log("sucess");
})
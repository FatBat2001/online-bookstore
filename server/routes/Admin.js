const router = require("express").Router();
const conn = require("../db/dbConnection");
const util = require("util");
const bcrypt =require("bcrypt");
const crypto = require("crypto");
const admin = require("../middleware/admin");
//const authorized = require("../middleware/authorize");

//view all pending users
router.get("/view-allusers",admin,
async(req,res)=>{
    try {
        const query = util.promisify(conn.query).bind(conn);
        const users = await query("select * from user");
        if(!users[0]){
            res.status(400).json({errors:
            [
                {
                    "msg":"no user found"
                }
            ], 
        });  
    }
    else{
    // preparing the users list
    let librarian_id = -1; 
    users.map((item, index) => { 
        delete item.password;
        if (item.type === "librarian")
            librarian_id = index;
            
    });
    users.splice(librarian_id, 1);

    res.status(200).json(users);
}} catch(err){
    res.status(500).json({err:err});
}});

//---------------------------------------------------------------------------------------------------------
//view all pending users
router.get("/view-pending",admin,
async(req,res)=>{
    try {
        const query = util.promisify(conn.query).bind(conn);
        const users = await query("select * from pending_user");
        if(!users[0]){
            res.status(400).json({errors:
            [
                {
                    "msg":"no user found"
                }
            ], 
        });  
    }
    else{
    delete users.password;
    res.status(200).json(users);
}}catch(err){
    res.status(500).json({err:err});
}});

//---------------------------------------------------------------------------------------------------------
//accept user
router.post("/accept-user/:id/:status",
async(req,res)=>{
    try{
        
         //2- check if email exists
        //await  / async
        const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
        //3- PREPARE OBJECT USER TO -> SAVE
        const user = await query("select * from pending_user where id = ?",[req.params.id]);
        
        const userData = {
            name : user[0].name,
            email: user[0].email,
            password: user[0].password,
            phone: user[0].phone,
            status: "1",
            type: "normal", 
            token: crypto.randomBytes(16).toString("hex"),
        };
        //1 = accepted // 0 = rejected
        if(req.params.status==="1"){
            await query(
                "insert into user set ?",
                [userData]
                );    
        }
        await query("delete from pending_user where id = ?",[req.params.id]);
    delete userData.password;
    res.status(200).json(userData);   
}

    catch(err){
        res.status(500).json({err:err});
    }
});

//add user (approve / reject)
//borrow request (approve reject)

//create book
router.post("/create-book",
async(req,res)=>{
  res.status(200).json("successfully created");
});


//delete book   
router.delete("/delete-book",
async(req,res)=>{
  res.status(200).json("successfully deleted");
});

module.exports = router;
const adminAuth = require('../middleware/admin');
const router = require('express').Router();
//require db connection
const connection = require('../db/dbConnection');
const { ExpressValidator } = require("express-validator");
const conn = require("../db/dbConnection");
const {body , validationResult} = require("express-validator");
const util = require("util");
const bcrypt =require("bcrypt");
const crypto = require("crypto");
const { log } = require("console");



// //#POST => SAVE BOOK / create
// router.post("/" , adminAuth,function(req , res){
//     const data = req.body;
//     connection.query("insert into books set ? ", {ISBN : data.ISBN ,  description : data.description } , (err , result , fields)=>{
//         if(err){
//             res.statusCode = 400 ;
//             res.json({
//                 message:"error occured",
//             });
//         }
//         res.json({
//             message:"MOVIE CREATED",
//         });
//     })
// });
// SHOW MOVIE [ADMIN, USER]

router.get("/showBorrowed", async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const borrow = await query("select * from borrowed_book_user");
    if (!borrow[0]) {
      res.status(404).json({ ms: "no borrowed book found !" });
    }
    const BorrowedBooks = await query("select * from book where id = ?",borrow[0].id)
    //for image url
    //borrow[0].image_url = "http://" + req.hostname + ":4000/" + borrow[0].image_url; 
    res.status(200).json(BorrowedBooks);
  });
  
module.exports = router;

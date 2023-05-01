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


const portNumber = ":4000";

//borrow request 
router.post("/borrow-request/:id", async (req, res) => {
  try {
      const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
      //REQUEST DATA
      const requestData = {
          userid: req.body.userid,
          bookid: req.params.id,
          status: "pending",
          ret_date: req.body.ret_date,
      }
      //INSERT REQUEST DATA TO "requested_book"
      const user = await query("insert into requested_book set ?", [
        requestData
      ]);
  
      
      res.status(200).json(requestData);
    } catch (err) {
      res.status(500).json({ err: err });
    }
});
// view all books  & Search Books 
// view books if passed a query parameter becomes our search function by all attributes 
// It's a one function that handles all from the fronted 
router.get("/view-books", async(req, res)=> {
  const query = util.promisify(conn.query).bind(conn);
  let search = "";
  if (req.query.search) {
    // query parameters 
      const key =  req.query.search;
      
      if (isIntegerString(key)) {
        search = `where ISBN = ${parseInt(key)} or  rack_number = ${parseInt(key)}`;
      } else {
        search = `where author regexp "${key}" or title regexp "${key}" or subject regexp "${key}"`;
      }
    }
  
  const books = await query(`select * from book ${search}`);
  // books.map((book) => {
  //   book.image_url = "http://" + req.hostname + portNumber + '/' + book.image_url;
  // })
  res.status(200).json(books);


  function isIntegerString(str) {
    return /^\d+$/.test(str);
  }
});


// search book by id  
router.get("/search-books/:id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const book = await query("select * from book where id = ?", [
    req.params.id,
  ]);

  if (!book[0]) {
    res.status(404).json({ ms: "book not found !" });
    
  } else {
    book[0].image_url = "http://" + req.hostname + ":4000/" + book[0].image_url;
    res.status(200).json(book[0]);
  }
  
});


//get borrow history 
router.get("/get-borrow-history",async(req,res)=>{
  try{
  const query = util.promisify(conn.query).bind(conn);
  //get requested books id & the userid
  const borrowhistory = await query("select * from requested_book");
  //get the book details from bookid 

  let arr = []
  let borrowRequestData = {}
  let books = []

  for (let index = 0; index < borrowhistory.length; index++) {
    let users = await query("select name from user where id = ?",[borrowhistory[index].userid]);
    books = await query("select * from book where id = ?",[borrowhistory[index].bookid]);
    console.log(books[0].isbn);
    borrowRequestData = {
      userName: users[0].name,
      bookId: books[0].id,
      ISBN: books[0].ISBN,
      title: books[0].title,
      author: books[0].author,
      image_url: "http://" + req.hostname + ":4000/" + books[0].image_url,
      rack_number: books[0].rack_number,
      status: borrowhistory[index].status
    }
    arr[index] = borrowRequestData
  }
  //get the user name from userid
  res.status(200).json(arr);
  //format an object to view to the front end
  
}
catch (err) {
  console.log(err);
  res.status(500).json({ err: err });
}
});

module.exports = router;

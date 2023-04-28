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
  books.map((book) => {
    book.image_url = "http://" + req.hostname + portNumber + '/' + book.image_url;
  })
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


module.exports = router;

const router = require("express").Router();
const conn = require("../db/dbConnection");
const util = require("util");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const admin = require("../middleware/admin");
const authorized = require("../middleware/authorize");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadimages");

const fs = require("fs");



const portNumber = ":4000";

// =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> THIS IS CRUD MODUL FOR BOOKS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<=
// Creating a book
router.post(
  "/create-book",
  admin,
  upload.single("image_url"),
  body("isbn")
    .isInt()
    .withMessage("please enter a valid isbn")
    .isLength({ min: 1 })
    .withMessage("enter a valid isbn"),

  body("title")
    .isString()
    .withMessage("please enter a valid title")
    .isLength({ min: 3 })
    .withMessage("title  should be at lease 3 characters"),
  body("author")
    .isString()
    .withMessage("please enter a valid author name")
    .isLength({ min: 3 })
    .withMessage("author name should be at lease 3 characters"),
  body("subject")
    .isString()
    .withMessage("please enter a valid title")
    .isLength({ min: 4 })
    .withMessage("subject  should be at lease 4 characters"),
  body("rack_number")
    .isInt()
    .withMessage("please enter a valid rack number")
    .isLength({ min: 1 })
    .withMessage("enter a valid racknumber"),

  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- VALIDATE THE IMAGE
      if (!req.file) {
        return res.status(400).json({
          errors: [
            {
              msg: "Image is Required",
            },
          ],
        });
      }

      // 3- PREPARE BOOK OBJECT
        const book = {
          ISBN: req.body.isbn,
          author: req.body.author,
          title:req.body.title,
          subject:req.body.subject,
          rack_number:req.body.rack_number,
          image_url: req.file.filename,
        };

      // 4 - INSERT BOOK INTO DB
      const query = util.promisify(conn.query).bind(conn);
      await query("insert into book set ? ", book);
      res.status(200).json({
        msg: "Book created successfully !",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
// update book
router.put(
  "/update-book/:id", // params
  admin,
  upload.single("image_url"),
  body("isbn")
    .isInt()
    .withMessage("please enter a valid isbn")
    .isLength({ min: 1 })
    .withMessage("enter a valid isbn"),

  body("title")
    .isString()
    .withMessage("please enter a valid title")
    .isLength({ min: 3 })
    .withMessage("title  should be at lease 3 characters"),
  body("author")
    .isString()
    .withMessage("please enter a valid author name")
    .isLength({ min: 3 })
    .withMessage("author name should be at lease 3 characters"),
  body("subject")
    .isString()
    .withMessage("please enter a valid title")
    .isLength({ min: 4 })
    .withMessage("subject  should be at lease 4 characters"),
  body("rack_number")
    .isInt()
    .withMessage("please enter a valid rack number")
    .isLength({ min: 1 })
    .withMessage("enter a valid racknumber"),
  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF BOOK EXISTS OR NOT
      const book = await query("select * from book where id = ?", [
        req.params.id,
      ]);
      if (!book[0]) {
        res.status(404).json({ ms: "book not found !" });
      }

      // 3- PREPARE BOOK OBJECT
      const bookObj = {
          ISBN: req.body.isbn,
          author: req.body.author,
          title: req.body.title,
          subject: req.body.subject,
          rack_number: req.body.rack_number,
        };

      if (req.file) {
        bookObj.image_url = req.file.filename;
        fs.unlinkSync("./upload/" + book[0].image_url); // delete old image
      }

      // 4- UPDATE MOVIE
      await query("update book set ? where id = ?", [bookObj, book[0].id]);

      res.status(200).json({
        msg: "book updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//delete book
router.delete(
  "/delete-book/:id", // params
  admin,
  async (req, res) => {
    try {
      // 1- CHECK IF BOOK EXISTS OR NOT
      const query = util.promisify(conn.query).bind(conn);
      const book = await query("select * from book where id = ?", [
        req.params.id,
      ]);

      if (!book[0]) {
        res.status(404).json({ ms: "book not found !" });
      }

      // 2- REMOVE BOOK IMAGE
      fs.unlinkSync("./upload/" + book[0].image_url); // delete old image
      await query("delete from book where id = ?", [book[0].id]);
      res.status(200).json({
        msg: "book delete successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);  

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








// =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CRUD BOOK ENDING <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< 
//view all pending users
router.get("/view-allusers", admin, async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);
    const users = await query("select * from user");
    if (!users[0]) {
      res.status(400).json({
        errors: [
          {
            msg: "no user found",
          },
        ],
      });
    } else {
      // preparing the users list
      let librarian_id = -1;
      users.map((item, index) => {
        delete item.password;
        if (item.type === "librarian") librarian_id = index;
      });
      users.splice(librarian_id, 1);

      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

//---------------------------------------------------------------------------------------------------------
//view all pending users
router.get("/view-pending", admin, async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);
    const users = await query("select * from pending_user");
    if (!users[0]) {
      res.status(400).json({
        errors: [
          {
            msg: "no user found",
          },
        ],
      });
    } else {
      delete users.password;
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

//---------------------------------------------------------------------------------------------------------
//accept user
router.post("/accept-user/:id/:status", async (req, res) => {
  try {
    //2- check if email exists
    //await  / async
    const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
    //3- PREPARE OBJECT USER TO -> SAVE
    const user = await query("select * from pending_user where id = ?", [
      req.params.id,
    ]);

    const userData = {
      name: user[0].name,
      email: user[0].email,
      password: user[0].password,
      phone: user[0].phone,
      status: "1",
      type: "normal",
      token: crypto.randomBytes(16).toString("hex"),
    };
    //1 = accepted // 0 = rejected
    if (req.params.status === "1") {
      await query("insert into user set ?", [userData]);
    }
    await query("delete from pending_user where id = ?", [req.params.id]);
    delete userData.password;
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

//add user (approve / reject)


//borrow request (approve reject)
router.post("/borrow-request/:id", async (req, res) => {
    try {
        const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
        //REQUEST DATA
        const requestData = {
            userid: req.body.userid,
            bookid: req.params.id,
            status: "pending",
            ret_date: req.body.date,
        }
        //INSERT REQUEST DATA TO "requested_book"
        const user = await query("insert into requested_book set ?", [
          requestData
        ]);
    
        
        res.status(200).json(requestData);
      } catch (err) {
        res.status(500).json({ err: err });
      }
})

//manage borrowed reqs
router.put("/manage-reqs/:id/:status",
async(req,res)=>{
    try {
        const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
        //status -> 1 accept // 0 -> reject
        let appliedstatus = "";
        if(req.params.status == "1"){
            appliedstatus = "accepted";
        }
        else{
            appliedstatus = "rejected";
        }
        await query("update requested_book set status = ?  where id = ?",[appliedstatus,req.params.id]);
        res.status(200).json("updated");
    } catch (err) {
        res.status(500).json({ err: err });
      }
});
//---------------------------------------------------------------------------------------------------------------------------------------------
//borrowed books
router.get("/show-borrowed",async(req,res)=>{
try {
    const query = util.promisify(conn.query).bind(conn);
    const book = await query("select * from requested_book");
    if (!book[0]) {
      res.status(400).json({
        errors: [
          {
            msg: "no books found",
          },
        ],
      });
    } else {
      res.status(200).json(book);
    }
  } catch (err) {
    res.status(500).json({ err: err });
  }
});



//---------------------------------------------------------------------------------------------------------------------------------------------
//history
router.get("/history/:id",async(req,res)=>{
  try {
      const query = util.promisify(conn.query).bind(conn);
      const book = await query("select * from requested_book where userid = ?",[req.params.id]);
      if (!book[0]) {
        res.status(400).json({
          errors: [
            {
              msg: "no history found",
            },
          ],
        });
      } else {
        res.status(200).json(book);
      }
    } catch (err) {
      res.status(500).json({ err: err });
    }
  });
//---------------------------------------------------------------------------------------------------------------------------------------------


module.exports = router;

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

      // 3- PREPARE MOVIE OBJECT
        const book = {
          ISBN: req.body.isbn,
          author: req.body.author,
          title:req.body.title,
          subject:req.body.subject,
          rack_number:req.body.rack_number,
          image_url: req.file.filename,
        };

      // 4 - INSERT MOVIE INTO DB
      const query = util.promisify(conn.query).bind(conn);
      await query("insert into book set ? ", book);
      res.status(200).json({
        msg: "movie created successfully !",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

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

//create book
router.post("/create-book", async (req, res) => {
  res.status(200).json("successfully created");
});

//delete book
router.delete("/delete-book", async (req, res) => {
  res.status(200).json("successfully deleted");
});

module.exports = router;

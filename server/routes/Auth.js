const router = require("express").Router();
const { ExpressValidator } = require("express-validator");
const conn = require("../db/dbConnection");
const { body, validationResult } = require("express-validator");
const util = require("util");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { log } = require("console");

//---------------------------------------------------------------------------------------------------------------
//REGISTERATION
router.post(
  "/register",
  body("email").isEmail().withMessage("please enter a valid email!"),
  body("name")
    .isString()
    .withMessage("please enter a valid name!")
    .isLength({ min: 10, max: 20 })
    .withMessage("name should be between (10-20) character"),
  body("password")
    .isLength({ min: 8, max: 12 })
    .withMessage("password should be between (8-12) character"),
  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //2- check if email exists
      //await  / async
      const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
      const checkEmailExists = await query(
        "select * from user where email = ?",
        [req.body.email]
      );
      const secondCheckEmailExists = await query(
        "select * from pending_user where email = ?",
        [req.body.email]
      );

      if (secondCheckEmailExists.length > 0) {
        res.status(400).json({
          errors: [
            {
              msg: "email already is pedning approval",
            },
          ],
        });
      }

      else if (checkEmailExists.length > 0) {
        res.status(400).json({
          errors: [
            {
              msg: "email already is a user",
            },
          ],
        });
      } else {
        //3- PREPARE OBJECT USER TO -> SAVE
        const userData = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          phone: req.body.phone,
        };
        // //4- insert user object into db
        // await query("insert into user set ?",userData);
        const pendinguser = {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          phone: userData.phone,
        };
        await query("insert into pending_user set ?", [pendinguser]);
        delete userData.password;
        res.status(200).json(userData);
      }
    } catch (err) {
      res.status(500).json({ err: err });
      return;
    }
  }
);

//------------------------------------------------------------------------------------------------------------

//LOGIN
router.post(
  "/login",
  body("email").isEmail().withMessage("please enter a valid email!"),
  body("password")
    .isLength({ min: 8, max: 12 })
    .withMessage("password should be between (8-12) character"),
  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //2- check if email exists
      //await  / async
      const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
      const user = await query("select * from user where email = ?", [
        req.body.email,
      ]);
      if (user.length == 0) {
        res.status(404).json({
          errors: [
            {
              msg: "email or password not found",
            },
          ],
        });
      }

      //3- COMPARE PASSWORD
      const checkpassword = req.body.password === user[0].password;
      if (checkpassword) {
        delete user[0].password;
        await query("UPDATE user SET status = 1 WHERE id  = ?", user[0].id);
        res.status(200).json(user);
      } else {
        res.status(404).json({
          errors: [
            {
              msg: "email or password doesnt match",
            },
          ],
        });
      }
    } catch (err) {
      res.status(500).json({ err: err });
      return;
    }
  }
);


//LOGOUT
router.post(
  "/logout",
  
  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //2- check if email exists
      //await  / async
      const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
      const user = await query("update user set status = 0 where  id = ?", [
        req.body.id,
      ]);
      if (user.length == 0) {
        res.status(404).json({
          errors: [
            {
              msg: "email or password not found",
            },
          ],
        });
      }

    } catch (err) {
      res.status(500).json({ err: err });
      return;
    }
  }
);
module.exports = router;

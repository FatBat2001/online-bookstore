const router = require("express").Router();
const { ExpressValidator } = require("express-validator");
const conn = require("../db/dbConnection");
const {body , validationResult} = require("express-validator");
const util = require("util");
const bcrypt =require("bcrypt");
const crypto = require("crypto");
const { log } = require("console");

//---------------------------------------------------------------------------------------------------------------
//REGISTERATION
router.post("/register",body("email").isEmail().withMessage("please enter a valid email!"),
body("name").isString().withMessage("please enter a valid name!")
.isLength({min :10 , max : 20})
.withMessage("name should be between (10-20) character"),
body("password").isLength({min : 8 , max:12}).withMessage("password should be between (8-12) character"),
async(req,res)=>{
    try{
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
        if(checkEmailExists.length > 0 ){
            res.status(400).json({errors:
            [
                {
                    "msg":"email alr exists"
                }
            ], 
        });
        }
        else{
        //3- PREPARE OBJECT USER TO -> SAVE
        const userData = {
            name : req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password , 10),
            phone: req.body.phone,
        };
        // //4- insert user object into db
        // await query("insert into user set ?",userData);
        const pendinguser = {
            name : userData.name,
            email: userData.email,
            password: userData.password,
            phone: userData.phone,
        }; 
    await query("insert into pending_user set ?",[pendinguser]);
    delete userData.password;
    res.status(200).json(userData);   
}
    }catch(err){
        res.status(500).json({err:err});
    }
});

//------------------------------------------------------------------------------------------------------------



//LOGIN
router.get("/login",
body("email").isEmail().withMessage("please enter a valid email!"),
body("password").isLength({min : 8 , max:12})
.withMessage("password should be between (8-12) character"),
async(req,res)=>{
    try{
        // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

        //2- check if email exists
        //await  / async
        const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
        const user = await query(
        "select * from user where email = ?",
        [req.body.email]
        );
        if(user.length == 0 ){
            res.status(404).json({errors:
            [
                {
                    "msg":"email or password not found"
                }
            ], 
        });
        }
 
        //3- COMPARE PASSWORD
        const checkpassword = (req.body.password === user[0].password);
        if(checkpassword){
            delete user[0].password;
            res.status(200).json(user)
        } else{
            res.status(404).json({errors:
                [
                    {
                        "msg":"email or password doesnt match"
                    }
                ], 
            });
        }        
    }catch(err){
        res.status(500).json({err:err});
    }
});


module.exports = router;
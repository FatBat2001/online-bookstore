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


module.exports = router;

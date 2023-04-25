const express = require('express'); 
const app = express();

// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.static('upload'));
const cors = require("cors");
app.use(cors());

const auth = require("./routes/Auth");
const books = require("./routes/Books");

//create server
app.listen(4000,"localhost" , () => {
    console.log("SERVER IS RUNNING..");
});

app.use("/auth",auth);
app.use("/books",books);


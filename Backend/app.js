

const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require("cors");
require ("dotenv").config();

require("./models/user")
require("./models/post")
require("./models/topic")


const app = express();
const PORT = process.env.PORT || "8088";   

app.use(express.json())
app.use(cors())

//DB Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("📚 DB is Connected"))
  .catch((err) => console.log("😨 DB Connection has error - ",err));


//Middleware 
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/topic"));




// Routes
app.get("/", (req, res, next) =>{
    res.send("<h1>❤️ Parenthood Community API</br> Developed By <a href='http://reachitright.com'>Reach It Right  Sri Lanka 🇱🇰</a></h1>");
    next();
});
 

app.listen(PORT, () =>{
    console.log(`🚀 Server is UP and running on PORT ${PORT }`)
});


const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require("cors");
require ("dotenv").config();


const app = express();
const PORT = process.env.PORT || "8088";   

app.use(cors())

//DB Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("📚 DB is Connected"))
  .catch((err) => console.log("😨 DB Connection has error",err));

  require("./models/user")
  app.use(express.json())



//Middleware 
app.use(require("./routes/auth"));




// Routes
app.get("/", (req, res, next) =>{
    res.send("<h1>❤️ Parenthood Community API</br> Developed By <a href='http://reachitright.digital'>Reach It Right  Sri Lanka 🇱🇰</a></h1>");
    next();
});
 

app.listen(PORT, () =>{
    console.log(`🚀 Server is UP and running on PORT ${PORT }`)
});
import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || "8090";


app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res, next) =>{
    res.send("<h1>❤️ Parenthood Community </br> Developed By <a href='http://reachitright.digital'>Reach It Right  Sri Lanka 🇱🇰</a></h1>");
    next();
});

app.listen(PORT, () =>{
    console.log(`🚀 Server is UP and running on PORT ${PORT }`)
});
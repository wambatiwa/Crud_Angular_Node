const express = require("express");

const bodyParser = require("body-parser");

var cors =require("cors");

const gregoryRoutes = require("./routes/grocery");
const errorController = require("./controllers/error");

const app = express();

const port = process.env.PORT || 3002;

app.use(bodyParser.json());

app.use(cors());



// app.use((req,res,next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
//     res.setHeader("Access-Control-Allow-Headers", "content-type, Authorization");
//     next();
// })

 
app.use("/gregory",gregoryRoutes);

app.use(errorController.get404);
app.use(errorController.get500);


const server = app.listen(port, () => {
    const address = server.address();
    console.log(`Server is running on ${address.address}:${address.port}`);
});
module.exports = app;
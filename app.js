const express=require("express")
const mongoose=require("mongoose")
const swaggerUi =require("swagger-ui-express")
const swaggerDocument =require("./swagger.json")
const bodyParser = require('body-parser');


const app=express()

mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.get('/getFile', (req, res) => {
    res.sendFile("test.html", { root: __dirname });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit as needed
app.use("/user",require("./routes/user"))
app.use("/post",require("./routes/post"))

app.listen(4000,()=>{
    console.log("Server Js Running.......")
})
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors')
const userRouter = require('./routes/userRouter');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const categoriesRouter = require('./routes/categoriesRouter');
const transactionRouter = require('./routes/transactionRouter')
const app=express();
//!connect mongoose
mongoose.connect("mongodb+srv://pradeesh0702:Pradeesh0207@cluster0.th4v6n1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{serverSelectionTimeoutMS: 30000}).then(()=>{console.log("DB connect");}).catch((e)=>{console.log(e);})
//!cors config
const corsOptions={
    origin: ["https://expense-tracker-1-5wom.onrender.com"]
}
app.use(cors(corsOptions))
//!middleware
app.use(express.json())
//!routes
app.use('/',userRouter)
app.use('/',categoriesRouter)
app.use('/',transactionRouter)
//!error handling middleware
app.use(errorHandlerMiddleware)
//!server run
const PORT=process.env.PORT||8000;
app.listen(PORT,()=>{console.log("the server is started");})

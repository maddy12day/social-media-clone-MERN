import express from 'express'
const app = express();

import helmet from 'helmet'
import cors from 'cors'
import mongoose from 'mongoose';
import morgan from 'morgan';
//using .env file to store confidencial info and accessing them without making them available in code
import dotenv from 'dotenv'
dotenv.config({path:'.env'})



//building connection with mongodb
mongoose.connect(process.env.URL).then(()=>{
    console.log("connection built successfully")
}).catch((err)=>{
    console.log(`connection failed error occured ${err}`)
})


//middleware 
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(cors())
app.use(express.static('public'));


//importing routes
import usersRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import postRoute from './routes/post.js'



//rest api routes
app.use('/api/user',usersRoute)
app.use('/api/auth',authRoute)
app.use('/api/posts', postRoute);


app.listen(8080,()=>{
    console.log("listening to port ")
})
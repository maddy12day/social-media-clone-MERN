import express from 'express'
const app = express();

import helmet from 'helmet'
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv'


//using .env file to store confidencial info and accessing them without making them available in code
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


//importing routes
import usersRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import postRoute from './routes/post.js'



//rest api routes
app.use('/api/user',usersRoute)
app.use('/api/auth',authRoute)
app.use('/api/post',postRoute)


app.listen(3000,()=>{
    console.log("listening to port 3000")
})
const express = require('express');
    const app = express();
    require('dotenv').config();
    app.use(express.json());
    const PORT = process.env.PORT || 7000;
    const fileUpload = require('express-fileupload');
    const cors = require('cors');
    const db_connect = require('./config/database');
    const cookieParser = require('cookie-parser');
    const userRouter = require('./routes/userRouter');
    const jobRouter = require('./routes/jobRouter');
    const applicationRouter = require('./routes/applicationRouter');
    // app.use(cors({
    //     origin: "http://localhost:5173/",
    //     methods: "GET, POST, PUT, DELETE",
    //     credentials: true,
    // })) 


    const corsOptions = {
        origin: "http://localhost:5173",
        methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
        credentials: true,
      };
      
      app.use(cors(corsOptions));
//
// import cors from 'cors';

// Inside your server setup code
// app.use(cors({
//     origin: 'http://localhost:5173/',
//     methods: 'GET,POST,PUT,DELETE',
//     allowedHeaders: 'Content-Type,Authorization'
// }));




    app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/'
    }));
    app.use(cookieParser());
     
    
    app.use(express.json());

   
    app.use('/api/v1', userRouter);
    app.use('/api/v1/job', jobRouter);
    app.use('/api/v1/application', applicationRouter);

    const cloudinary = require('./config/cloudinary');
    cloudinary.cloudinaryConnect();
    app.listen(PORT, () =>{
        console.log(`App is connected successfully at port no ${PORT}`);
    })
    
    db_connect();
    app.get('/', (req, res) =>{
        res.send("Hello Everyone")
    })

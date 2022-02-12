
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';

//import Application Constants
import { DB,PORT,DOMAIN } from './constants';

// Router Exports
import userRoutes from './routes/users';

// initialize express application
const app = express();

//Apply Application Middleware
app.use(cors());
app.use(json());

// inject sub Routes Users
app.use('/users',userRoutes);

const main = async () => {
    try {
        await mongoose.connect(DB,{
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        .then( app.listen(PORT,() => console.log(`Server running on ${DOMAIN}`)) )
        .catch((error) => console.log(`Connection error : ${error.message}`));
    } catch (error) {
        console.log(`Unable to start the server : \n ${error.message}`);
    }
}

main();
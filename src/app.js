import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cars from './routers/cars';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.listen(3000, ()=>{
    console.log('Hey am listening to you');
});


app.use('/api/cars',cars);


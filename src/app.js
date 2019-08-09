import express from 'express';
import cors from 'cors';

import cars from './routers/cars';

const app = express();

app.use(cors());

app.listen(3000, ()=>{
    console.log('Hey am listening to you');
});


app.use('/api/cars',cars);


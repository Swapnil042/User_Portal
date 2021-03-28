const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/users');
const adminRouter = require('./routes/admin');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(adminRouter);

app.listen(PORT, ()=>{
    console.log('Server is running on PORT: ', PORT);
})
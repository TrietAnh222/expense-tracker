require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors)
//mongo V6 trở lên thì không cần vế sau
mongoose.connect(process.env.DATABASE_URL , {useNewUrlParser: true , useUnifiedTopology : true})
.then(()=> console.log('MongoDB connected'))
.catch(err=> console.log(err));

app.get('/', (req,res)=>{
    res.send('Expense tracker API');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => console.log(`Server running on port ${PORT}`))
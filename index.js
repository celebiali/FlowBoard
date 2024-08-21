const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/database.js');
const app = express();
//
const Auth = require('./routes/auth.js');
const Post = require('./routes/post.js');

app.use(cors());
app.use(express.json(limit = '50mb',extended = true));
app.use(express.urlencoded(limit = '50mb',extended = true));

dotenv.config();
 


app.use('/', Auth);
app.use('/', Post);




const PORT = process.env.PORT || 5000; 

db();

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`);
})


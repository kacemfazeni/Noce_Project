const mongoose = require('mongoose');
const session = require('express-session');
const express = require('express');
const dotenv = require('dotenv');
const user = require('./routes/user');
const post = require('./routes/post');
//create instance of express
const app = express();

app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
   }));
dotenv.config();
const  MONGODB_URL= process.env.MONGODB_URL;
const  port= process.env.PORT || 5000;
//create a middleware for parsing the content of body 
app.use(express.json())

app.use('/user',user);
app.use('/post', post);

app.post('/login',async  (req, res) => {
    const { username, password } = req.body;
    try {
    const user =  await UserModel.findOne({ username : username });
   // User not found
    if (!user) {
    return res.status(401).send('Invalid username ');
    }else{
   // Compare the provided password with the hashed password stored in the database
    bcrypt.compare(password, user.password, (err, result) => {
   if (result) {
    // Store user data in session
    req.session.user = user;
    res.status(200).send('Welcome !! User Connected');
    } else {
    res.status(401).send('Invalid  password');
    }
    });
} } catch (error) {
    res.status(400).json({ error });
  }
});
//http://localhost:9000/node/?name=glsi?firstname=node
//pass paramas with query parameters to express server
app.get('/node',(req,res)=>{
    console.log("test1",req.query.name)
    console.log("test2",req.query.firstname)
})

//http://localhost:9000/tic/glsi/node
//pass paramas with params  to express server
app.get('/tic/:name/:firstname',(req,res)=>{
    console.log("test1",req.params.name)
    console.log("test2",req.params.firstname)
})
app.get('/',(req,res)=>{
    console.log(req.headers)
    res.send('Welcome Back ')
})
app.get('/template',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

app.get('/middle',(req,res,next)=>{
    //res.send('request number 1 ')
    console.log('request number 1')
    next()
},(req,res,next)=>{
    res.send('request number 2 ')
})
//https://github.com/maminebnr
//mohamedamine.benrhouma@tek-up.de

app.get('/exmpl1',(req,res)=>{
    //res.redirect('https://www.google.com')
    //res.end('hello and goodbye ')
    //res.status(200).send('everything is good')
    //res.render('index')
})

mongoose.connect(MONGODB_URL).then(()=>{
    console.log('connecting to mongodb');
app.listen(port,()=>{
    console.log('listening on port 9000');
})
}).catch((err)=>{
    console.error('Error connecting to mongodb :' , err.message);
})
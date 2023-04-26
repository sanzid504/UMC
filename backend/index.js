const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const {sequelize, Payment, User, Course, CourseUser} = require("./models/index.js");
const jwt = require('jsonwebtoken');
// Your Express app setup and routes

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testDatabaseConnection();

const app = express();
const PORT = process.env.PORT || 4040;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// STUDENT ROUTES

app.post('/login', async (req,res)=>{
  const {phone, password} = req.body;
  try{
    const u = await User.findOne({where:{phone}})
    if(u){
      const match = await bcrypt.compare(password, u.password)
      if(match){
        const token = jwt.sign({ id: u._id }, 'mia khalifa', { expiresIn: '1h' });
        console.log(token)
        res.status(200).json({token})
      }else{
        res.status(400).json({message:"Wrong password"})
      }
    }else {
      res.status(400).json({message:"User not found"})
    } 
  }catch(e){
    console.log(e)
  }
})

app.post('/register', async (req,res)=>{
  const {phone,name,password} = req.body;
  console.log(req.body)
  try{
    const u = await User.findOne({where:{phone}})
    if(u) res.status(400).json({message:"User already exists"})
    else{
      const hash = await bcrypt.hash(password, 10)
      const user = await User.create({
        _id: uuidv4(),
        name,
        phone,
        password: hash,
      })
      res.status(200).json(user)
    }
  }catch(e){
    console.log(e)
  }
})
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'mia khalifa'); // Replace 'mia khalifa' with your secret key
    const user = await User.findOne({where:{ _id: decoded.id }});

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

app.get('/user', authMiddleware, async (req,res)=>{
  try{
    const user = req.user
    res.status(200).json(user)
  }catch(e){
    console.log(e)
  }
})



app.post('/enroll',authMiddleware, async (req,res)=>{
    const {form, course_id, TRX_ID} = req.body;
    const user = req.user;
    try{
      const CU = await CourseUser.create({
        _id: uuidv4(),
        user_id: user._id,
        course_id,
        form,
        TRX_ID,
      })
      console.log(CU)
      res.status(200).json(CU)
    }catch(e){
      console.log(e)
      res.status(400).json({message:"Something went wrong"})
    }  
    
})
app.get('/api/courses',authMiddleware, async (req,res)=>{
  const courses = await Course.findAll({
    raw:true
  })
  for(const _ of courses){
    const cu = await CourseUser.findOne({
      where:{
        user_id:req.user._id,
        course_id:_._id
      }
    })
    if(!cu) _.enrolled = null
    if(cu && cu.status === "pending") _.enrolled = 'pending'
    if(cu && cu.status === "approved") _.enrolled = 'approved'
  }
  console.log(courses)
  res.status(200).json(courses)  
})












// ADMIN ROUTES

app.get('/admin/courses', async (req, res) => {
  try {
    const courses = await Course.findAll({raw:true});
    for(const _ of courses) _.students = await CourseUser.count({where:{course_id: _._id, status:"approved"}})
    res.status(200).json(courses);
  } catch (e) {
    console.log(e);
  }
})
app.get('/admin/course/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const course = await Course.findOne({
      where: {
        _id: id
      }
    });
    res.status(200).json(course);
  } catch (e) {
    console.log(e);
  }
})
app.post('/admin/course/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const {name, description, price, status, form,seat} = req.body;
    const course = await Course.update({
      name,
      description,
      seats:parseInt(seat),
      price:parseInt(price),
      status,
      form,
    },{
      where:{
        _id:id
      }
    })
    res.status(200).json(course)
  }catch(e){
    console.log(e)
  }
}) 

app.delete('/admin/course/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const course = await Course.update(
      {
        status: 'deleted'
      },
      {
      where:{
        _id:id
      }
    })
    res.status(200).json(course)
  }catch(e){
    console.log(e)
  }
})
app.get('/admin/pending', async (req,res)=>{
  const pending = await CourseUser.findAll({
    where:{
      status:'pending'
    }, 
    raw:true,
  })
  for(const _ of pending){
    const u = await User.findOne({where:{_id:_.user_id}})
    _.name = u.name
    _.course = (await Course.findOne({where:{_id:_.course_id}})).name
    _.phone = u.phone
  }
  console.log(pending)
  res.status(200).json(pending)
})
app.post('/admin/pending/approve', async (req,res)=>{
  const {_id} =req.body
  try{
    const cu = await CourseUser.update({
      status:'approved'
    },{
      where:{
        _id
      }
    })
    await Course.update({
      seats:sequelize.literal('seats - 1')
    },{
      where:{
        _id:cu.course_id
      }
    })
    res.status(200).json(cu)
  }catch(e){
    console.log(e)
  }  
})
app.post('/admin/course', async (req,res)=>{
  try{
   const  {name, description, price, status, form,seatCap} = req.body;
   const course = await Course.create({
      _id: uuidv4(4),
      name,
      description,
      seats:seatCap,
      price,
      status,
      form,
    })
    res.status(200).json(course)
  }catch(e){
    console.log(e)
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

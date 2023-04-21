const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');

const {sequelize, Payment, User, Course} = require("./models/index.js");

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
app.get('/admin/courses', async (req, res) => {
  try {
    const courses = await Course.findAll();
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

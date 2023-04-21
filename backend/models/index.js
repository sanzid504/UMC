const sequelize = require("../config/database");

const Payment = require('./payment');
const User = require('./users');
const Course = require('./course');

// Set up the relationships between the models
// ...

async function sync() {
    try{
        await Payment.sync({alter:true});
        await User.sync({alter:true});
        await Course.sync({alter:true});
        console.log(`Database synced`);
    }catch(e){
        console.log(e);
    }
}
sync();

module.exports = { 
    sequelize,
    Payment,
    User,
    Course
};

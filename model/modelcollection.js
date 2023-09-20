const mongoose = require('mongoose')

const admins=new mongoose.model("admins",{
    email:String,
    psw:String,
    enquiry:[]
})
const doctors=new mongoose.model("doctors",{
    dr_image:String,
    dr_name:String,
    email:String,
    psw:String,
    department:String,
    degree:String,
    description:String,
    consulting_time:[],
    Opbooking:[],
    ConformOPBooking:[],
    chat:[],
})
const users=new mongoose.model("users",{
    uname:String,
    email:String,
    age:String,
    gender:String,
    psw:String,
    chat:[],
    renquiry:[],
    opticket:[],
    conformop:[]
})
module.exports={
    admins,
    doctors,
    users
}
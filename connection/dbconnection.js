const mongoose = require('mongoose')
mongoose.connect(process.env.BASE_URL,{
    useUniFiedTopology:true,
    useNewUrlParser:true,
}).then(()=>{
    console.log("mongodb is connected");
}).catch(()=>{
    console.log("mongodb is not connected");
})
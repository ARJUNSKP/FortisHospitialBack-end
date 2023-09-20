const { model } = require('mongoose')
const models=require('../model/modelcollection')

const register=(req,res)=>{
    const {email,psw}=req.body
    
    models.admins.findOne({email,psw}).then(admin=>{
        if(admin){
            res.status(400).json("admin is all ready exist")
        }
        else{
            var newAdmin=new models.admins({
                        email,
                        psw,
                        enquiry:[]
            })
            newAdmin.save()
    
            res.status(200).json(newAdmin)
        }
    })
}
const adminLogin=(req,res)=>{
    const {email,psw}=req.body

    models.admins.findOne({email,psw}).then(admin=>{
        if(admin){
            res.status(200).json("admin is login")
        }
        else{
            res.status(401).json('incorrect User name or password')
        }
    })
}
const doctorRigistration=(req,res)=>{
    const {dr_image,dr_name,email,psw,department,degree,description}=req.body

    models.doctors.findOne({email,psw}).then(doctor=>{
        if(doctor){
            res.status(401).json("doctor all ready registered")
        }
        else{
            var newDoctor = new models.doctors({
                dr_image,
                dr_name,
                email,
                psw,
                department,
                degree,
                description,
                consulting_time:[],
                Opbooking:[],
                ConformOPBooking:[],
                chat:[],
            })

            newDoctor.save()
            res.status(200).json(newDoctor)
        }
    })
}

const departmentdoctorsApi=(req,res)=>{
    const {department}=req.params

    models.doctors.find({department}).then(doctorname =>{
        if(doctorname){
            res.status(200).json({doctorname})
        }
        else{
            res.status(401).json("doctor not present")
        }
    })

}

const doctorprofileApi=(req,res)=>{
    const dr_name=req.params.dr_name
    models.doctors.findOne({dr_name}).then(doctor =>{
        if(doctor){
            res.status(200).json(doctor)
        }
        else{
            res.status(401).json("doctors not exist")
        }
    })
}

const doctorprofileUpdateApi=(req,res)=>{
    const dr_name=req.params
    const {dr_image,email,psw,department,degree,description}=req.body
    const dr_replacename=req.body.dr_name
    models.doctors.findOne(dr_name).then(doctor =>{
        if(doctor){
            doctor.dr_name=dr_replacename
            doctor.email=email
            doctor.psw=psw
            doctor.department=department
            doctor.degree=degree
            doctor.description=description
            doctor.save()
            res.json(doctor)
        }
    })
}

const deleteDoctorProfile=(req,res)=>{
    const dr_name=req.params
    models.doctors.deleteOne(dr_name).then(doctor=>{
        if(doctor){
            res.status(200).json("deleted doctor Profile successfully")
        }
        else{
            res.status(401).json('not deleted doctor Profile')
        }
    })
}


// *********** user api logic **************

const userRegistration=(req,res)=>{
    const {uname,email,age,gender,psw}=req.body
    models.users.findOne({uname}).then(user=>{
        if(user){
            res.status(200).json(uname)
        }
        else{
            var newUser= new models.users({
                uname,
                email,
                age,
                gender,
                psw,
                chat:[],
                renquiry:[],
                opticket:[],
                conformop:[]
            })
            newUser.save()
            res.status(200).json({uname,email})
        }
    })
}
const userLogin=(req,res)=>{
    const {email,psw}=req.body
    models.users.findOne({email,psw}).then(user=>{
        if(user){
            res.status(200).json(user.uname)
        }
        else{
            res.status(401).json("incorrect User name or password")
        }
    })
}


// ******** doctor api login **************
const doctorLogin=(req,res)=>{
    const {email,psw}=req.body
    models.doctors.findOne({email,psw}).then(doctor=>{
        if(doctor){
            res.status(200).json(doctor.dr_name)
        }
        else{
            res.status(401).json("incorrect User name or password")
        }
    })
}
const doctorprofileapi=(req,res)=>{
    const drname=req.params
    models.doctors.findOne(drname).then(doctor=>{
        if(doctor){
            res.status(200).json(doctor)
        }
        else{
            res.status(401).json("not get doctor Profile")
        }
    })
}
const doctorTimeupdateapi=(req,res)=>{
    const dr_name=req.params
    const {mfrom,mto,afrom,ato}=req.body
    models.doctors.findOne(dr_name).then(doctor=>{
        if(doctor){
            doctor.consulting_time[0].morningtime.mfrom=mfrom
            doctor.consulting_time[0].morningtime.mto=mto
            doctor.consulting_time[0].eveningtime.afrom=afrom
            doctor.consulting_time[0].eveningtime.ato=ato
            doctor.save()
            res.status(200).json(doctor.consulting_time)
        }
        else{
            res.status(401).json("doctor not found")
        }
    })
}

const allAppointment=(req,res)=>{
    const dr_name=req.params
    models.doctors.find(dr_name).then(appointment=>{
        if(appointment){
            res.status(200).json(appointment[0].Opbooking)
        }
        else{
            res.status(401).json("Not Get Appointment")
        }
    })
}

// const OpbookingApi=(req,res)=>{
//     const dr_name=req.params
//     const {pname,page,pgender,pdate,schedule}=req.body
//     models.doctors.findOne(dr_name).then(doctor=>{
//         if(doctor){
//             doctor.Opbooking.findOne({pdate}).then(slot=>{
//                 if(slot){
//                     if(schedule=='Morning'){
//                         slot.findOne('Morning').then(morningslot=>{
//                             if(morningslot){
//                                 morningslot.findOne(pname).then(patient=>{
//                                     if(patient){
//                                         res.status(401).json('Patient is already registered')
//                                     }
//                                     else{
//                                         var newpatient = new models.doctors.Opbooking[pdate].schedule({
//                                             pname,
//                                             page,
//                                             pgender,
//                                             pdate,
//                                             schedule
//                                         })
//                                         newpatient.save()
//                                         res.status(200).json(newpatient)
//                                     }
//                                 })
//                             }
//                             else{
//                                 var newMorningslot=new models.doctors.Opbooking[pdate]({
//                                     schedule:{
//                                         pname,
//                                         page,
//                                         pgender,
//                                         pdate,
//                                         schedule
//                                     }
//                                 })
//                                 newMorningslot.save()
//                                 res.status(200).json(newMorningslot)
//                             }
//                         })
//                     }
//                     if(schedule=='Evening'){
//                         slot.findOne('Evening').then(eveningslot=>{
//                             if(eveningslot){
//                                 eveningslot.findOne(pname).then(patient=>{
//                                     if(patient){
//                                         res.status(401).json('Patient is already registered')
//                                     }
//                                     else{
//                                         var newpatient = new models.doctors.Opbooking[pdate].schedule({
//                                             pname,
//                                             page,
//                                             pgender,
//                                             pdate,
//                                             schedule
//                                         })
//                                         newpatient.save()
//                                         res.status(200).json(newpatient)
//                                     }
//                                 })
//                             }
//                             else{
//                                 var newEveningslot=new models.doctors.Opbooking[pdate]({
//                                     schedule:{
//                                         pname,
//                                         page,
//                                         pgender,
//                                         pdate,
//                                         schedule
//                                     }
//                                 })
//                                 newEveningslot.save()
//                                 res.status(200).json(newEveningslot)
//                             }
//                         })
//                     }
//                 }
//                 else{
//                     if(schedule=='Morning'){
//                         doctor.Opbooking.push(
//                             {pdate:{
//                                 schedule:{
//                                         pname,
//                                         page,
//                                         pgender,
//                                         pdate,
//                                         schedule
//                                 }
//                             }
                            
//                             })
//                             slot.save()
//                             res.status(200).json(doctor.Opbooking)
//                     }
//                     if(schedule=='Evening'){
//                         doctor.Opbooking.push(
//                             {pdate:{
//                                 schedule:{
//                                         pname,
//                                         page,
//                                         pgender,
//                                         pdate,
//                                         schedule
//                                 }
//                             }
                            
//                             })
//                             slot.save()
//                             res.status(200).json(doctor.Opbooking)
//                     }
//                 }
//             })
//         }
//     })
// }

const OpbooksApi=(req,res)=>{
    const dr_name=req.params
    const {pname,page,pdate,pgender,schedule}=req.body
    models.doctors.findOne(dr_name).then(doctor=>{
        if(doctor){
            doctor.Opbooking.push({
                pname,
                page,
                pdate,
                pgender,
                schedule
            })
            doctor.save()
            res.status(200).json(doctor.Opbooking)
        }
        else{
            res.status(401).json("Doctor not Fond")
        }
    })
}

module.exports={
    register,
    adminLogin,
    doctorRigistration,
    departmentdoctorsApi,
    doctorprofileApi,
    doctorprofileUpdateApi,
    deleteDoctorProfile,
    userRegistration,
    userLogin,
    doctorLogin,
    doctorprofileapi,
    doctorTimeupdateapi,
    OpbooksApi,
    allAppointment
}
const express = require('express')
const logicpath = require('../cotrolles/logic')

const router = new express.Router()

router.post('/express/admin/create',logicpath.register)
router.post('/express/admin/login',logicpath.adminLogin)
router.post('/express/admin/DoctorRegistration',logicpath.doctorRigistration)
router.get('/express/depatmentDoctor/:department',logicpath.departmentdoctorsApi)
router.get('/express/doctorprofile/:dr_name',logicpath.doctorprofileApi)
router.post('/express/doctorprofileupdate/:dr_name',logicpath.doctorprofileUpdateApi)
router.get('/express/doctorprofiledelete/:dr_name',logicpath.deleteDoctorProfile)
// ****** user path api ********
router.post('/express/user/registration',logicpath.userRegistration)
router.post('/express/user/login',logicpath.userLogin)

// ****** doctor path api **********
router.post('/express/doctor/login',logicpath.doctorLogin)
router.get('/express/doctorprofile/:dr_name',logicpath.doctorprofileapi)
router.post('/express/doctor/timeset/:dr_name',logicpath.doctorTimeupdateapi)
router.post('/express/opbooking/:dr_name',logicpath.OpbooksApi)
router.get('/express/Allappointment/:dr_name',logicpath.allAppointment)

// ******* admin ****************
router.post('/express/countatus',logicpath.countatusAdmin)
router.get('/express/user/enquiry/list',logicpath.enquirylist)

module.exports=router
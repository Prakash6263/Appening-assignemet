const express = require('express');
const router = express.Router();

//--------------------------------------------------
const userController =require('./usercontroller')






//=---------------------------------------
router.post("/user" ,userController.createuser )
router.post("/signup",userController.signup)
router.post("/anagram",userController.isAnagram)
router.get("/checkAdmin",userController.admin)

module.exports = router;
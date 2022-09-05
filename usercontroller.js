const usermodel = require("./usermodel")

const jwt=require("jsonwebtoken")
const mongoose=require("mongoose")

let isValid=function(value){
    if(typeof value==="undefined" || typeof value===null) return false
    if(typeof value==="string" && value.trim().length===0) return false
    return true
}

let isValidrequestBody = function (requestBody) {
    return Object.keys(requestBody).length !== 0
}

const createuser = async function (req, res) {
    try{
        var data = req.body
        if(!isValidrequestBody(data)){
            res.status(400).send({msg:"bad req"})
        }
        if(!isValid(data.name)){
            res.status(400).send({msg:"name is required"})
        }
        if(!isValid(data.email)){
            res.status(400).send({msg:"email is required"})
        }
        if(!isValid(data.password)){
            res.status(400).send({msg:"password is required"})
        }

    let savedData = await usermodel.create(data)
    res.status(200).send({ data: savedData })

}catch(error){
    res.status(500).send({status:"failed",message:error.message})
    }
}






const signup = async function (req, res) {
    try {

        const requestBody = req.body
        if (!isValidrequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'value in request body is required' })
            return
        }

        let email = req.body.email
        let password = req.body.password

        if (!isValid(email)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide valid email' })
            return
        }
      
        if (!isValid(password)) {
            res.status(400).send({ status: false, message: 'password must be present' })
            return
        }
        

        if (email && password) {
            let User = await usermodel.findOne({ email: email })
            if (!User) {
                return res.status(400).send({ status: false, msg: "email does not exist" })
            }
                const Token = jwt.sign({
                    userId: User._id,
                }, "prakash")
                res.status(200).send({ status: true, msg: "success", data: { userId: User._id, token: Token } })
        }
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


let isAnagram= async function(req,res){
    try{
        let str1=req.body.str1
        let str2=req.body.str2
        let areAnagram=function (str1,str2)
{
    // Get lengths of both strings
    let n1 = str1.length;
    let n2 = str2.length;
  
    str1=str1.split("")
    str2=str2.split("")


    // If length of both strings is not
    // same, then they cannot be anagram
    if (n1 != n2)
        return false;
   
    // Sort both strings
    str1.sort();
    str2.sort()
   
    // Compare sorted strings
    for (let i = 0; i < n1; i++)
        if (str1[i] != str2[i])
            return false;
   
    return true;
}

let answer=await areAnagram(str1,str2)

answer==true?res.status(200).send({msg:"the given two string are anagram"}):res.status(400).send({msg:"the given two string are not anagram"})


    }catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
     

}



let admin=async function(req,res){
    try{
        let userId=req.body.id
        let user=await usermodel.findOne({_id:userId})
        if(!user){
            res.status(404).send({msg:"user not found"})
        }
        let result=await usermodel.find()
        user.isAdmin==true?res.status(200).send({msg:"ok",data:result}):res.status(400).send({msg:"connot view the list"})

    }catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
     
}

module.exports= {signup,createuser,isAnagram,admin}









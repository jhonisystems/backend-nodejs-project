const express = require("express")
const AuthService = require("../services/auth")

function auth(app){
    const router = express.Router()
    app.use("/api/auth",router)
    const authServ = new AuthService

    router.post("/login",(req,res)=>{
        const token = authServ.login(req.body)

        return res.json(token)
    })

    router.post("/signup",async(req,res)=>{
        const result = await authServ.signup(req.body)

        return res.status(result.error?400:200).json(result)
    })
}

module.exports = auth
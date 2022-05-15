const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')


const isPostulant = (req, res, next) => {
    req.minRole = 1
    req.filter = "none"
    authValidation(req, res, next)
}

const isTheCreator = (req, res, next) => {
    req.minRole = 1
    req.filter = "creator"
    authValidation(req, res, next)
}
  
const isRecruiter = (req, res, next) => {
    req.minRole = 2
    req.filter = "none"
    authValidation(req, res, next)
}
  
const isAdmin = (req, res, next) => {
    req.minRole = 3
    req.filter = "none"
    authValidation(req, res, next)
}

function authValidation(req,res,next) {

    const bearer = req.headers.authorization
    
    if(bearer && bearer.startsWith('Bearer')){
        //console.log(bearer)
        const token = bearer.split(" ")[1]
        
        jwt.verify(token,jwtSecret,(err,decoded)=>{
            if(err){
                console.log(err)
                return res.status(401).json({
                    success: false,
                    error:true,
                    message:"Token inválido"
                })
            }

            console.log(decoded)
            //mando la propiedad user a la ruta con los datos del toquen decodificados
            req.user = decoded

            //next()
            validateRole(req, res, next)
        }
        )
    }else{
        return res.status(401).json({
            success: false,
            error:true,
            message:"Token no encontrado"
        })
    }
} 
    
  
const validateRole = (req, res, next) => {
  
    if (req.user.role >= req.minRole) {
       if(req.filter === "creator"){
            if(req.user.id === req.params.author || req.user.role === 3){
                //console.log(req.user.id,req.params.author)
                next()
            }else{
                return res.status(403).json({
                    success: false,
                    error:true,
                    message:"Forbidden action - no es el autor ni el admin"
                })
            }
        }else{
            next()  
        }
    } else {
        return res.status(403).json({
            success: false,
            error:true,
            message:"Insufficient permissions"
        })
    }
}
  
module.exports = { isPostulant, isRecruiter, isAdmin , isTheCreator }
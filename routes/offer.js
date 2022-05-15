const express = require("express")
const OfferService = require("../services/offer")
const {isTheCreator,isRecruiter,isPostulant} = require("../middleware/authValidation")

function offers(app) {
    const router = express.Router()
    const offerServ = new OfferService()
    app.use("/api/offer", router)

    router.get("/", async (_req, res) => {
        const resOffer = await offerServ.getAllOffer()
        return res.json(resOffer)
    })

    router.get("/salary/:salary", async(req,res)=>{
        const {salary} = req.params
        const resOffer = await offerServ.getOfferForSalaryHigherThan(salary)
        return res.json(resOffer)
    })

    //info de las ofertas que publicó un reclutador junto con la info de los postulantes que aplicaron a la oferta
    router.get("/recruiterOffers",isRecruiter, async(req,res)=>{
        const {id} = req.user
        const resOffer = await offerServ.getOfferForRecruiter(id)
        return res.json(resOffer)
    })

    router.post("/search", async(req,res)=>{
        const {category,level,country,programmingLanguages,mode} = req.body
        const resOffer = await offerServ.getOfferWithFilters(category,level,country,programmingLanguages,mode)
        return res.json(resOffer)
    })

    router.post("/", isRecruiter,async(req,res)=>{
        const resOffer = await offerServ.createOffer(req.body)
        return res.json(resOffer)
    })

    //aplicar a una oferta
    router.put("/addApplicant",isPostulant,async (req,res)=>{
        const {id} = req.user
        const ifUserAlreadyApplied = await offerServ.checkIfApplicant(req.body.idOffer,id)
        
        if(ifUserAlreadyApplied){
            return res.status(400).json({message:"You already applied to this offer"})
        }
        const resOffer = await offerServ.addApplicant(req.body.idOffer,id)
        return res.json(resOffer)
    })

    router.put("/:id/:authorId",isTheCreator, async(req,res)=>{
        const {body,params:{id}} = req
        const resOffer = await offerServ.updateOffer(id,body)
        return res.json(resOffer)
    })

    router.delete("/:id/:authorId",isTheCreator, async(req,res)=>{
        const {params:{id}} = req
        const resOffer = await offerServ.deleteOffer(id)
        return res.json(resOffer)
    })
}

module.exports = offers
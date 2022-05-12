const express = require("express")
const FilterService = require("../services/filter")

function filters(app) {
    const router = express.Router()
    const filterServ = new FilterService()
    app.use("/api/filter", router)

    router.get("/", async (_req, res) => {
        const resfilter = await filterServ.getAllOffer()
        return res.json(resfilter)
    })

    router.post("/", async(req,res)=>{
        const resfilter = await filterServ.createOffer(req.body)
        return res.json(resfilter)
    })

    router.put("/:id", async(req,res)=>{
        const {body,params:{id}} = req
        const resfilter = await filterServ.updateOffer(id,body)
        return res.json(resfilter)
    })

    router.delete("/:id", async(req,res)=>{
        const {params:{id}} = req
        const resfilter = await filterServ.deleteOffer(id)
        return res.json(resfilter)
    })
}

module.exports = filters
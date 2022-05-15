const express = require("express")
const CompanyService = require("../services/company")
const {isTheCreator} = require("../middleware/authValidation")

function companies(app) {
    const router = express.Router()
    const companyServ = new CompanyService()
    app.use("/api/company", router)

    router.get("/", async (_req, res) => {
        const resCompanies = await companyServ.getAllCompany()
        return res.json(resCompanies)
    })

    router.get("/:id", async (req, res) => {
        const { id } = req.params
        const resCompany = await companyServ.getCompanyById(id)
        return res.json(resCompany)
    })

    router.post("/", async(req,res)=>{
        const rescompany = await companyServ.createCompany(req.body)
        return res.json(rescompany)
    })

    router.put("/:id/:author/", isTheCreator, async(req,res)=>{
        const {body,params:{id}} = req
        console.log(body,id)
        const rescompany = await companyServ.updateCompany(id,body)
        return res.json(rescompany)
    })

    router.delete("/:id/:author/", isTheCreator, async(req,res)=>{
        const {params:{id}} = req
        const rescompany = await companyServ.deleteCompany(id)
        return res.json(rescompany)
    })
}

module.exports = companies
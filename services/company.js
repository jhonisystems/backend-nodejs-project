const CompanyModel = require('../models/company')

class CompanyService{
    async getAllCompany(){
        try {
            return await CompanyModel.find()
        } catch (error) {
            console.log(error)
        }
    }

    async getCompanyById(id){
        try {
            return await CompanyModel.findById(id)
        } catch (error) {
            console.log(error)
        }
    }

    async createCompany(data){
        try {
            return await CompanyModel.create(data)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteCompany(id){
        try{
            return await CompanyModel.findByIdAndDelete(id)
        }catch(error){
            console.log(error)
        }
    }

    async updateCompany(id,data){
        try {
            return await CompanyModel.findByIdAndUpdate(id,data,{new:true})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = CompanyService
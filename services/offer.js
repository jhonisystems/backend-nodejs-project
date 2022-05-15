const offerModel = require('../models/offer')

class OfferService {
    async getAllOffer() {
        try {
            return await offerModel.find()
        } catch (error) {
            console.log(error)
        }
    }

    async getOfferForSalaryHigherThan(salary) {
        try {
            return await offerModel.find({ salary: { $gte: salary } })
        } catch (error) {
            console.log(error)
        }
    }

    async getOfferWithFilters(category,level,country,programmingLanguages,vmode) {
        try {
            return await offerModel.find({ $or: [{ categories: category }, { english_level: level }, { countries: country }, { programming_languages: programmingLanguages }, { mode: vmode }] })
        } catch (error) {
            console.log(error)
        }
    }

    async getOfferById(id) {
        try {
            return await offerModel.findById(id)
        } catch (error) {
            console.log(error)
        }
    }

    async createOffer(data,recruiterId) {
        try {
            return await offerModel.create({...data,authorId:recruiterId})
            
        } catch (error) {
            console.log(error)
        }
    }

    //info de las ofertas que publicó un reclutador junto con la info de los postulantes que aplicaron a la oferta
    async getOfferForRecruiter(idRecruiter){
        const offer = await offerModel.find({authorId:idRecruiter}).populate("applicants")

        //const teams = await TeamModel.find({members:idUser}).populate("members","name email").populate("idLeader","name email")
        //const teams = await TeamModel.find({members:{  $elemMatch:{_id:idUser} }}).populate("members._id","name email").populate("idLeader","name email")
        return offer
    }

    //verificar si un postulante ya aplicó a una oferta
    async checkIfApplicant(idOffer, idApplicant) {
        const offer = await offerModel.findById(idOffer)
        const applicant = offer.applicants.find(applicant => applicant._id.toString() === idApplicant.toString())
        return applicant
    }

    //agregar un aplicante a la oferta
    async addApplicant(idOffer, idApplicant) {
        try {
            return await offerModel.findByIdAndUpdate(idOffer, { $push: { applicants: {_id:idApplicant} } }, { new: true })
        } catch (error) {
            console.log(error)
        }
    }

    async deleteOffer(idOffer, idCreator, role) {
        try{
            const offer = await offerModel.findById(idOffer)
            if(offer.authorId.toString() === idCreator.toString() || role === 3){
                return await offerModel.findByIdAndDelete(idOffer)
            }else{
                return {
                    success:false,
                    error:true,
                    message:"No tienes permisos para eliminar esta oferta"
                }
            }
        }catch(error){
            console.log(error)
        }
    }

    async updateOffer(idOffer, data, idCreator, role) {
        try {
            const offer = await offerModel.findById(idOffer)
            if (offer.authorId.toString() === idCreator.toString() || role === 3) {
                return await offerModel.findByIdAndUpdate(idOffer, data, { new: true })
            } else {
                return {
                    success: false,
                    error: true,
                    message: "No tienes permisos para actualizar esta oferta"
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = OfferService
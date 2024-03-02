const ContactModel = require("../models/Contact")

class ContactController {
    static displayContact = async (req, res) => {
        try {
            const {name, email} = req.admin
            const contactData = await ContactModel.find()
            //console.log(contactData)
            res.render('admin/dashboard', {cd:contactData, n:name, e:email})
        } catch (error) {
            console.log(error)
        }
    }

    static insertContact = async (req, res) => {
        //console.log(req.body)
        try {
            const result = new ContactModel({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                message: req.body.message
            })
            await result.save()
            res.render('contact')
            //res.redirect('/admin/dashboard') // We always take "url of route" in redirect function
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ContactController
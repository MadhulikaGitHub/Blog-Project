const AdminModel = require("../../models/Admin")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AdminController {

    static dashboard = async (req, res) => {
        try {
            res.render('admin/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    static register = async (req, res) => {
        try {
            const { name, email, password, confirmpassword } = req.body
            const admin = await AdminModel.findOne({ email: email })
            if (admin) {
                req.flash('error', 'Email ID already exist.')
                res.redirect('/signup')
            } else {
                if (name && email && password && confirmpassword) {
                    if (password == confirmpassword) {
                        const hashpassword = await bcrypt.hash(password,10)
                        //console.log(req.body)
                        const register = await new AdminModel({
                            name: name,
                            email: email,
                            password: hashpassword
                        })
                        await register.save()
                        res.redirect('/login')
                    } else {
                        req.flash('error', 'Password and Confirm Password does not match.')
                        res.redirect('/signup')
                    }
                }
                else {
                    req.flash('error', 'All fields are required.')
                    res.redirect('/signup')
                }
            }

        } catch (error) {
            console.log(error)
        }

    }

    static verifyLogin = async (req, res) => {
        try {
            //console.log(req.body)
            const {email, password} = req.body
            if (email && password) {
                const admin = await AdminModel.findOne({email:email})
                if (admin != null) {
                    const ismatched = await bcrypt.compare(password,admin.password)
                    if (ismatched) {
                        // Generate web token(jwt) for secure login
                        const token = jwt.sign({id:admin._id}, 'adminloginsecurekey123')
                        //console.log(token)
                        res.cookie('token', token)
                        res.redirect('/admin/dashboard')
                    } else {
                        req.flash('error', 'Email ID and Password does not match.')
                        res.redirect('/login')
                    }
                } else {
                    req.flash('error', 'You are not a registerd user.')
                    res.redirect('/login')
                }
            } else {
                req.flash('error', 'All fields are required.')
                res.redirect('/login')
            }
            
         } catch (error) {
            console.log(error)
        }

    }

    static logout = async (req, res) => {
        try {
            res.clearCookie('token')
            res.redirect('/login')
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = AdminController
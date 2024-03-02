const BlogModel = require("../models/Blog")
const CategoryModel = require("../models/Category")

class FrontController {
    static home = async (req, res) => {
        try {
            const blogs = await BlogModel.find().sort({_id:-1}).limit(6)
            //console.log(blogs)
            res.render('index', {b:blogs})
        } catch (error) {
            console.log(error)
        }
    }

    static about = async (req, res) => {
        try {
            res.render('about')
        } catch (error) {
            console.log(error)
        }
    }

    static contact = async (req, res) => {
        try {
            res.render('contact')
        } catch (error) {
            console.log(error)
        }

    }

    static blog = async (req, res) => {
        try {
            const blogs = await BlogModel.find().sort({_id:-1})
            res.render('bloglist', {b:blogs})
        } catch (error) {
            console.log(error)
        }
    }

    static login = async (req, res) => {
        try {
            res.render('login', {message:req.flash('error')})
        } catch (error) {
            console.log(error)
        }
    }

    static signup = async (req, res) => {
        try {
            res.render('signup', {message:req.flash('error')})
        } catch (error) {
            console.log(error)
        }
    }

    static detail = async (req, res) => {
        try {
            const detail = await BlogModel.findById(req.params.id)
            const recentBlog = await BlogModel.find().limit(6)
            const category = await CategoryModel.find()
            res.render('detail',{d:detail, r:recentBlog, c:category})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = FrontController
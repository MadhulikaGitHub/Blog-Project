const CategoryModel = require('../../models/Category')

class CategoryController {

    static categoryDisplay = async (req, res) => {
        try {
            const data = await CategoryModel.find()
            res.render('admin/category/admin-category-list', {d:data})
        } catch (error) {
            console.log(error)
        }
    }

    static addCategory = async (req, res) => {
        try {
            res.render('admin/category/category-form')
        } catch (error) {
            console.log(error)
        }
    }

    static insertCategory = async (req, res) => {
        try {
            //console.log(req.body)
            const result = new CategoryModel({
                cat_name: req.body.cat_name
            })
            await result.save()
            res.redirect('/admin/category/display')
        } catch (error) {
            console.log(error)
        }
    }

    static editCategory = async (req, res) => {
        try {
            const categoryData = await CategoryModel.findById(req.params.id)
            //console.log(categoryData)
            res.render('admin/category/editCategory', {edit:categoryData})
        } catch (error) {
            console.log(error)
        }
    }

    static updateCategory = async (req, res) => {
        try {
            if (req.body.cat_name != '') {
                const update = await CategoryModel.findByIdAndUpdate(req.params.id, {
                    cat_name: req.body.cat_name
                })
                await update.save()
                res.redirect('/admin/category/display')
            } else {
                res.redirect(`/categoryEdit/:${req.params.id}`)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    static deleteCategory = async (req, res) => {
        try {
            await CategoryModel.findByIdAndDelete(req.params.id)
            res.redirect('/admin/category/display')
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = CategoryController
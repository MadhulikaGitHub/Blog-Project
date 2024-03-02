const BlogModel = require('../../models/Blog')
var cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dtmlikaii',
    api_key: '851966655832888',
    api_secret: '6Nrh9yRy-hTfjucr_ixPR1pDW6k'
})

class BlogController {

    static displayBlog = async (req, res) => {
        try {
            const data = await BlogModel.find()
            //console.log(data)
            res.render('admin/blog/admin-blog-list', { d: data })
        } catch (error) {
            console.log(error)
        }
    }

    static addBlog = async (req, res) => {
        try {
            res.render('admin/blog/blog-form')
        } catch (error) {
            console.log(error)
        }
    }

    static insertBlog = async (req, res) => {
        try {
            if (req.files) {
                //console.log(req.files.image)
                const file = req.files.image
                const myImage = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'blogImage'
                })
                //console.log(myImage)
                //console.log(req.body)
                //const result = await BlogModel.create(req.body)
                const result = new BlogModel({
                    title: req.body.title,
                    description: req.body.description,
                    image: {
                        public_id: myImage.public_id,
                        url: myImage.secure_url
                    }
                })
                await result.save()
                //console.log(result)
            } else {
                const result = new BlogModel({
                    title: req.body.title,
                    description: req.body.description
                })
                await result.save()
            }
            res.redirect('/admin/blog/display') // We always take "url of route" in redirect function
        } catch (error) {
            console.log(error)
        }
    }

    static viewBlog = async (req, res) => {
        try {
            //console.log(req.params.id)
            const data = await BlogModel.findById(req.params.id)
            //console.log(data)
            res.render('admin/blog/view', { view: data })
        } catch (error) {
            console.log(error)
        }
    }

    static editBlog = async (req, res) => {
        try {
            const data = await BlogModel.findById(req.params.id)
            res.render('admin/blog/edit', { edit: data })
        } catch (error) {
            console.log(error)
        }
    }

    static updateBlog = async (req, res) => {
        try {

            if (req.files) {
                // First Task - Delete previous image
                const blog = await BlogModel.findById(req.params.id)
                const imageId = blog.image.public_id
                //console.log(imageId)

                if (imageId) {
                    await cloudinary.uploader.destroy(imageId)

                    // Second Task - Insert new image
                    const file = req.files.image
                    const myImage = await cloudinary.uploader.upload(file.tempFilePath, {
                        folder: 'blogImage'
                    })
                    //console.log(req.body)
                    //console.log(req.params.id)
                    const update = await BlogModel.findByIdAndUpdate(req.params.id, {
                        title: req.body.title,
                        description: req.body.description,
                        image: {
                            public_id: myImage.public_id,
                            url: myImage.secure_url
                        }
                    })
                    await update.save()
                } else {
                    // Second Task - Insert new image
                    const file = req.files.image
                    const myImage = await cloudinary.uploader.upload(file.tempFilePath, {
                        folder: 'blogImage'
                    })
                    //console.log(req.body)
                    //console.log(req.params.id)
                    const update = await BlogModel.findByIdAndUpdate(req.params.id, {
                        title: req.body.title,
                        description: req.body.description,
                        image: {
                            public_id: myImage.public_id,
                            url: myImage.secure_url
                        }
                    })
                    await update.save()
                }

            } else {
                const update = await BlogModel.findByIdAndUpdate(req.params.id, {
                    title: req.body.title,
                    description: req.body.description
                })
            }
            res.redirect('/admin/blog/display')
        } catch (error) {
            console.log(error)
        }
    }

    static deleteBlog = async (req, res) => {
        try {
            // Delete image from server
            const blog = await BlogModel.findById(req.params.id)
            const imageId = blog.image.public_id
            //console.log(imageId)
            if (imageId) {
                await cloudinary.uploader.destroy(imageId)
                await BlogModel.findByIdAndDelete(req.params.id, req.body)
            } else {
                await BlogModel.findByIdAndDelete(req.params.id, req.body)
            }
            res.redirect('/admin/blog/display')
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = BlogController
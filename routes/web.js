const express = require('express')
const router = express.Router()
const FrontController = require('../controllers/FrontController')
const AdminController = require('../controllers/admin/AdminController')
const BlogController = require('../controllers/admin/BlogController')
const CategoryController = require('../controllers/admin/CategoryController')
const ContactController = require('../controllers/ContactController')
const checkAdminAuth = require('../middleware/auth')

// route

// FrontController
router.get('/', FrontController.home)
router.get('/about', FrontController.about)
router.get('/contact', FrontController.contact)
router.get('/blog', FrontController.blog)
router.get('/login', FrontController.login)
router.get('/signup', FrontController.signup)
router.get('/detail/:id', FrontController.detail)

// AdminController
//router.get('/admin/dashboard', AdminController.dashboard)
router.post('/register', AdminController.register)
router.post('/verifyLogin', AdminController.verifyLogin)
router.get('/logout', AdminController.logout)

// BlogController
router.get('/admin/blog/display', checkAdminAuth, BlogController.displayBlog)
router.get('/admin/blog/add-blog', checkAdminAuth, BlogController.addBlog)
router.post('/insertBlog', BlogController.insertBlog)
router.get('/blogView/:id', checkAdminAuth, BlogController.viewBlog)
router.get('/blogEdit/:id', checkAdminAuth, BlogController.editBlog)
router.post('/blogUpdate/:id', BlogController.updateBlog)
router.get('/blogDelete/:id', checkAdminAuth, BlogController.deleteBlog)

// ContactController
router.get('/admin/dashboard', checkAdminAuth, ContactController.displayContact)
router.post('/insertContact', ContactController.insertContact)

// CategoryController
router.get('/admin/category/display', checkAdminAuth, CategoryController.categoryDisplay)
router.get('/admin/category/add-category', checkAdminAuth, CategoryController.addCategory)
router.post('/insertCategory', CategoryController.insertCategory)
router.get('/categoryEdit/:id', checkAdminAuth, CategoryController.editCategory)
router.post('/categoryUpdate/:id', CategoryController.updateCategory)
router.get('/categoryDelete/:id', checkAdminAuth, CategoryController.deleteCategory)

module.exports = router
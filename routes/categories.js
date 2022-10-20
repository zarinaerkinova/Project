const { Router } = require('express')
const router = Router()
const { Types } = require('mongoose');
const Category = require('../model/categories')
const Product = require('../model/products')

router.get('/', async function (req, res) {
    const category = await Category.find()
    res.render('categories', {
        title: 'Categories',
        category
    })
})

router.get('/add', async function (req, res) {
    const category = await Category.find()
    res.render('addCategory', {
        title: 'Add',
        category
    })
})

router.post('/add', async function (req, res) {
    const { name, image } = req.body

    const category = new Category({
        name,
        image
    })

    await category.save()
    res.redirect('/categories')
})

router.get('/update/:id', async (req, res) => {
    const category = await Category.findById(req.params.id)
    res.render('updateCategory', {
        title: 'Update',
        name: category.name,
        image: category.image,
        id: category.id
    })
})

router.post('/update/', async (req, res) => {
    const { name, image, id } = req.body

    await Category.findByIdAndUpdate(id, { name, image })

    res.redirect('/categories')
})

router.get('/delete/:id', async (req, res) => {
    const id = req.params.id
    await Category.findByIdAndRemove(id)
    res.redirect('/categories')
})

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id)
    const products = await Product.aggregate([
        {
            $match: {
                categoryId: Types.ObjectId(req.params.id)
            }
        }
    ])

    res.render('category', {
        title: category.name,
        name: category.name,
        image: category.image,
        id: category.id,
        products
    })
})

module.exports = router
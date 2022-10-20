const { Router } = require('express')
const router = Router()
const Product = require('../model/products')
const Category = require('../model/categories')
const { Types } = require('mongoose')

router.get('/', async function (req, res) {
  const products = await Product.find()
  res.render('products', {
    title: 'Products',
    products
  })
})

// router.get('/find/:id', constructor.findProducts)

router.get('/add', async function (req, res) {
  const products = await Product.find()
  const categories = await Category.find()
  res.render('addProduct', {
    title: 'Add',
    products,
    categories
  })
})

router.post('/add', async function (req, res) {
  const { name, image, price, categoryId } = req.body

  const product = new Product({
    name,
    image,
    price,
    categoryId: Types.ObjectId(categoryId),
  })

  await product.save()
  res.redirect('/products')
})

router.get('/update/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  const categories = await Category.find();
  res.render('updateProduct', {
    title: product.name,
    image: product.image,
    id: product.id,
    categories
  })
})

router.post('/update/', async (req, res) => {
  const { name, image, id, categoryId, price } = req.body
  await Product.findByIdAndUpdate(id, {
    name,
    image,
    categoryId: Types.ObjectId(categoryId),
    price
  })
  res.redirect('/products')
})

router.get('/delete/:id', async (req, res) => {
  const id = req.params.id
  await Product.findByIdAndDelete(id)
  res.redirect('/products')
})

module.exports = router
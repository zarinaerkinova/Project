const { Router } = require('express')
const router = Router()
const Auth = require('../model/user')
const bcrypt = require('bcrypt')

router.get('/register', async(req, res) => {
    res.render('register', {
        title: 'Register'
    })
})

router.post('/register', async (req, res) => {
    const {name, image, phone, password} = req.body

    const hash = await bcrypt.hash(password, 10)

    const user = new Auth({name, image, phone, password: hash})

    await user.save()

    res.redirect('/auth/login')
})

router.get('/login', async(req, res) => {
    res.render('login', {
        title: 'Login'
    })
})

router.post('/login', async (req,res)=>{
    const {phone, password} = req.body

    const user = await Auth.findOne({phone})

    if(!user){
      return res.send('Phone number not found')
    }

    const compare = await bcrypt.compare(password, user.password)

    if(!compare){
        return res.send('Password is not true')
    }

    res.redirect('/')
})

module.exports = router
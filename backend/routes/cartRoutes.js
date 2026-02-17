const router = require('express').Router()
const Cart = require('../models/Cart')
const {auth} = require('../middlewares/auth')
const { json } = require('express')

router.post('/add', auth, async(req,res) => {
    const {productId} = req.body
    let cart = await Cart.findOne({userId:req.user.id})

    if(!cart) cart = await Cart.create({userId:req.user.id, items:[]})

    cart.items.push({productId, qty:1})

    
    await cart.save()

    res.json(cart)
})

router.get('/', auth, async(req,res) => {
    res.json(await Cart.findOne({userId:req.user.id}))
})

module.exports = router
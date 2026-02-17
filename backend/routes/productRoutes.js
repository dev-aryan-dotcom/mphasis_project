const router = require('express').Router()
const Product = require('../models/Product')
const {auth, adminOnly} = require('../middlewares/auth')

//get all
router.get('/', async(req,res) => {
    res.json(await Product.find())
});

//add
router.post('/', auth, adminOnly, async(req,res) => {
    res.json(await Product.create(req.body));
});

//update
router.put('/:id', auth, adminOnly, async(req,res) => {
    res.json(await Product.findByIdAndUpdate(req.params.id, req.body))
})

//delete
router.delete('/:id', auth, adminOnly, async(req,res) => {
    res.json(await Product.findByIdAndDelete(req.params.id))
})

module.exports = router
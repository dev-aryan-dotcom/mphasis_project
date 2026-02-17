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


module.exports = router
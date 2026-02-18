const router = require('express').Router()
const Product = require('../models/Product')
const {auth, adminOnly} = require('../middlewares/auth')

//get all
router.get('/', async(req,res) => {
    res.json(await Product.find())
});

//add
// ADD product (any logged in user)
router.post('/', auth, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
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
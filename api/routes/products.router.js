const express = require('express');
const {faker} = require('@faker-js/faker')

const productsServices = require('../services/products.services.js')
const validatorHandler = require('../middlewares/validator.handler')
const { createProductSchema,
        updateProductSchema,
        getProductSchema } = require('../schemas/product.schema')
const service = new productsServices()
const router = express.Router();

router.get('/:id',
validatorHandler(getProductSchema, 'params'),
async (req,res,next) => {
  await service.show(req, res, next)
})

//query params
router.get('/', async (req, res) => {
  await service.index(res)
})

router.post('/create',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  await service.store(req, res)
})

router.patch('/update/:id', async (req, res, next) => {
  await service.update(req, res, next)
})

router.delete('/delete/:id', async (req, res, next) => {
  await service.destroy(req, res, next)
})

module.exports = router;

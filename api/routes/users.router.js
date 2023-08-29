const express = require('express');

const usersServices = require('../services/users.services');
const validatorHandler = require('../middlewares/validator.handler');

const service = new usersServices();
const router = express.Router();

router.get(
  '/:id',
  /* validatorHandler(getProductSchema, 'params'), */
  async (req, res, next) => {
    await service.show(req, res, next);
  }
);

router.post(
  '/create',
  async (req, res, next) => {
    await service.store(req, res, next)
  }
);

router.patch(
  '/update/:id',
  async (req, res, next) => {
    await service.update(req, res, next)
  }
)

router.get(
  '/',
  async (req, res, next) => {
    await service.index(req, res, next)
  }
);

router.delete(
  '/delete/:id',
  async (req, res, next) => {
    await service.destroy(req, res, next)
  }
)

module.exports = router;

const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')
const { models, sequelize } = require('../../libs/sequelize');
const { QueryTypes } = require('sequelize');

class productsServices {
  constructor() {

  }

  generate() {
    //const { size } = req.query;
    try {
      for (let i = 0; i < 100; i++) {
        this.products.push({
          id: i + 1,
          name: faker.commerce.productName(),
          price: faker.commerce.price(),
          image: faker.image.imageUrl(),
          isBlock: faker.datatype.boolean()
        });
      }
    } catch (error) {
      console.error('hubo prblemas al treaer los datos ', error);
    }
  }

  async index(res) {
    try {
      const products = await models.Product.findAll()
      res.status(200).json({
        products: products
      })
    } catch(error) {
      console.log('ERROR AL TRAER LOS PRODUCTOS ',error)
    }
  }

  async show(req, res, next) {
    const { id } = req.params;
    try {
      const product = await models.Product.findByPk(id)
      if (!product) {
        res.status(404).json({
          message: 'producto invalido!',
        });
      } else if(product.isBlock){
        throw boom.conflict("product not available")
      } else{
        res.status(200).json(product);
      }
    } catch (error) {
      next(error)
      console.error('hubo prblemas al treaer el registro ', error);
    }
  }

  async store(req, res) {
    const body = req.body;
    try {
      const product = await models.Product.create(
        {
          name: body.name,
          price:body.price,
        }
      )
      res.status(201).json({
        message: 'Created',
        data: product,
      });
    } catch (error) {
      console.error('hubo prblemas al treaer el crear el registro', error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const body = req.body
      const product = await models.Product.update(
        {
          price: body.price
        },
        {
          where:{
            id:id
          }
        }
      )
      res.status(200).json({
        message: 'Updated',
        data: product
      });
    } catch (error) {
      next(error)
      /* console.error('hubo prblemas al treaer el actualizar el registro', error);
      res.status(404).json({
        message: 'error',
        data: error.message,
      }); */
    }
  }

  async destroy(req, res, next) {
    const { id } = req.params;
    try {
      let index = this.products.findIndex((d) => d.id == id);
      if(parseInt(index) === -1){
        throw boom.unauthorized("not autorized")
      }
      this.products.splice(index, 1);
      res.status(200).json({
        message: 'Deleted',
        id,
      });
    } catch (error) {
      console.error('hubo prblemas al eliminar el registro', error);
      next(error)
    }
  }
}

module.exports = productsServices;

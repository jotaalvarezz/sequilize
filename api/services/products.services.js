const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')
const pool = require('../../libs/postgresPool')

class productsServices {
  constructor() {
    this.pool = pool;
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
      const products = await this.pool.query(`
                                              SELECT * FROM products
                                            `);
      res.status(200).json({
        products: products.rows
      })
    } catch(error) {
      console.log('ERROR AL TRAER LOS PRODUCTOS ',error)
    }
  }

  async show(req, res, next) {
    const { id } = req.params;
    try {
      const product = await this.pool.query(`
                                            select * from products
                                                      where id = $1
                                          `,[id])
      if (!product) {
        res.status(404).json({
          message: 'producto invalido!',
        });
      } else if(product.isBlock){
        throw boom.conflict("product not available")
      } else{
        res.status(200).json(product.rows);
      }
    } catch (error) {
      next(error)
      console.error('hubo prblemas al treaer el registro ', error);
    }
  }

  async store(req, res) {
    const request = req.body;
    //const size = this.products.length;
    const sql = `insert into products (name, price, img)
                          values ($1, $2, $3)`;
    try {
      const product = await this.pool.query(sql,[request.name, request.price, request.img])
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
      const request = req.body
      request.id = parseInt(id);
      let index = this.products.findIndex((d) => d.id == id);
      if(index === -1){
        //throw new error("producto not found")
        throw boom.notFound("producto not found")
      }
      this.products[index] = request;
      res.status(200).json({
        message: 'Updated',
        data: index,
        id,
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

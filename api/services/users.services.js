const boom = require('@hapi/boom');
const sequelize = require('../../libs/sequelize');
const { QueryTypes } = require('sequelize');
const { models } = require('../../libs/sequelize')

class usersServices {
  constructor() {}

  async show(req, res, next) {
    const { id } = req.params;
    try {
      /*const query = await client.query(`CREATE TABLE users (
                                          id serial PRIMARY KEY,
                                          name text,
                                          password integer
                                      );`); */
      //return query
      let query = await models.User.findByPk(id)
      res.json({
        id: id,
        query: query,
      });
    } catch (error) {
      next(error);
      console.error('hubo prblemas al conectarse ', error);
    }
  }

  async index(req, res, next){
    let sql = []
    try {
      sql = await sequelize.query('select * from users');
      res.json({
        users: sql
      })
    } catch(error) {
      console.log("ocurruo mlo siguiente ",error)
    }
  }

  async store(req, res, next) {
    const body = req.body;
    try {
      /* const user = await sequelize.query(`
                                          insert into
                                            users (name, email, password, created_at)
                                            values (:name, :email, :password, :created_at);`,
                                          {
                                            replacements:{
                                                            name: body.name,
                                                            password: body.password,
                                                            email: body.email,
                                                            created_at: body.created_at
                                                          },
                                            type: QueryTypes.INSERT
                                          }
                                        ) */
      const user = await models.User.create({
                                              name:body.name,
                                              email:body.email,
                                              password:body.password
                                            })
      res.json({
        objeto: user,
      });
    } catch (error) {
      console.log('no se pudo insertar el user ', error);
    }
  }

  async update(req, res, next){
    const { id } = req.params;
    const body = req.body
    try {
      const user = await models.User.update(
        {
          name:body.name
        },
        {
          where:{
            id:id
          }
        }
      )
    res.json(
      {
        data:user
      }
    )
    } catch(error) {
      console.error(error)
    }
  }

  async destroy(req, res, next){
    const { id } = req.params
    try {
      const user = await models.User.destroy(
        {
          where:{
            id:id
          }
        }
      )

      res.json(
        {
          data:user
        }
      )
    } catch(error) {
      console.log(error)
    }
  }
}

module.exports = usersServices;

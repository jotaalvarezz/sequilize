const boom = require('@hapi/boom');
const sequelize = require('../../libs/sequelize');
const { QueryTypes } = require('sequelize');

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
      let query = await sequelize.query(`
                                select * from users where id = ?
                              `,
                              {
                                replacements: [parseInt(id)],
                                type: QueryTypes.SELECT
                              })
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
      const user = await sequelize.query(`
                                          insert into
                                            users (name, password)
                                            values (:name, :password);`,
                                          {
                                            replacements:{
                                                            name: body.name,
                                                            password: body.password
                                                          },
                                            type: QueryTypes.INSERT
                                          }
                                        )
      res.json({
        objeto: user,
      });
    } catch (error) {
      console.log('no se pudo insertar el user ', error);
    }
  }
}

module.exports = usersServices;

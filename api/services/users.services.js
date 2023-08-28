const boom = require('@hapi/boom');
const getConnection = require('../../libs/postgres');

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
      //return query.rows
      //console.log("conexion ",client)
      const client = await getConnection();
      let query = await client.query(`
                                select * from users where id = $1
                              `,[parseInt(id)])
      res.json({
        id: id,
        query: query.rows,
      });
    } catch (error) {
      next(error);
      console.error('hubo prblemas al conectarse ', error);
    }
  }

  async index(req, res, next){
    let sql = []
    try {
      const client = await getConnection();
      sql = await client.query('select * from users');
      res.json({
        users: sql.rows
      })
    } catch(error) {
      console.log("ocurruo mlo siguiente ",error)
    }
  }

  async store(req, res, next) {
    const body = req.body;
    try {
      const client = await getConnection();
      await client.query('insert into users (name, password) values ($1,$2);',[body.name, body.password])
      res.json({
        objeto: client,
      });
    } catch (error) {
      console.log('no se pudo insertar el user ', error);
    }
  }
}

module.exports = usersServices;

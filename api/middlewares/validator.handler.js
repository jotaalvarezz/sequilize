const Boom = require('@hapi/boom')

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const {error} = schema.validate(data);
    console.log("el niño y el papa ",schema.validate(data, { abortEarly:false }))
    if(error){
      next(Boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;

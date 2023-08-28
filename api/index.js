const express = require('express');
const routerApi = require('./routes')
const {logError, handleError, boomHandleError} = require('./middlewares/error.handler.js')
const cors = require('cors')
require('dotenv/config')

const app = express()
const port = process.env.PORT || 5000

/* para que node detecte las variables de entorno del archivo.env debe instalar la libreria dotenv */

app.use(express.json())

const whritelist = [process.env.ORIGIN, process.env.ORIGIN2, 'http://localhost:5000']
const options = {
  origin: (origin, callback) => {
    console.log("origen ",origin)
    if(whritelist.includes(origin)){
      callback(null, true)
    } else{
      callback(new Error('No tiene permisos para acceder a esta Api'))
    }
  }
}

app.use(cors())

app.get('/api', (req,res) => {
  res.send('Bienvenido a mi servidor en express prueba');
})

app.get('/api/nuevaruta', (req, res) => {
  res.send("Nueva ruta")
})

routerApi(app)

app.use(logError)
app.use(boomHandleError)
app.use(handleError)

app.listen(port, () => {
  console.log('Mi port: ' + port)
})

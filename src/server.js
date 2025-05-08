const  express = require('express');
const  dotenv = require('dotenv');
const rutaPacientes = require('./routes/pacientes.route.js')
const home = require('./routes/home.routes.js')
dotenv.config()

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT || 3001
    this.middleware()
    //this.cors()
    this.engine(process.env.TEMPLATE || 'ejs')
    this.rutas()
 
    
  }

/*   cors () {
    this.app.use(cors())
  } */

  engine (template) {
    if(template === 'ejs'){
       this.app.set('view engine', 'ejs')
       this.app.set('views', './src/views/ejs')
    }else if(template === 'pug'){
       this.app.set('view engine', 'pug')
       this.app.set('views', './src/views/pug')
    }

  }
  middleware () {
    // this.app.use('/', express.static('public'))
    this.app.use(express.json())
  }

  rutas () {
    this.app.use('/api/v1/pacientes', rutaPacientes)
    this.app.use('/',home)
 
    // aca van las otras rutas

  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(
        `Server running on port ${this.port}, host: ${process.env.HOST}:${this.port}`
      )
    })
  }
}

module.exports = Server
const  express = require('express');
const session = require('express-session');
const  dotenv = require('dotenv');
const morgan = require('morgan');
const methodOverride = require('method-override');
const engine = require('ejs-mate');

//Rutas API
const rutaPacientes = require('./routes/pacientes.route.js');
const apiTurnosRoutes = require('./routes/turnos');
const authRoutes = require('./routes/auth');


// Rutas locales
const localTurnos = require('./routes/local/turnos');
const localPacientes = require('./routes/local/pacientes');

const home = require('./routes/home.routes.js');

//para el login
const loginRoutes = require('./routes/login');

//Middleware para proteger rutas locales
const { verificarSesion } = require('./middlewares/authLocal');

dotenv.config()

class Server {
  constructor (template=process.env.TEMPLATE || 'ejs') {
    this.app = express()
    this.port = process.env.PORT || 3001
    this.middleware()
    this.engine(template)
    this.rutas();
  }

  engine (template) {  
    this.app.engine('ejs', engine);
    this.app.set('view engine', 'ejs');
    this.app.set('views', './src/views/ejs');

  }
  middleware () {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(methodOverride('_method')); 
    this.app.use(morgan('dev'));
    this.app.use(express.static('src/public'));

    this.app.use(session({
      secret: 'clinica-secreto',
      resave: false,
      saveUninitialized: false,
    }));

  }

  rutas () {
    //rutas API(con JWT)---
    this.app.use('/api/v1/pacientes', rutaPacientes)
    this.app.use('/api/v1/turnos', apiTurnosRoutes);
    this.app.use('/api/v1', authRoutes);

    //Rutas ligin y logout---
    this.app.use('/', loginRoutes);

    //Rutas locales (protegidas con express-session)---
    this.app.use('/local/turnos', verificarSesion, localTurnos);
    this.app.use('/local/pacientes', verificarSesion, localPacientes);
    
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
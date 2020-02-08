const express = require('express');
const path = require('path')
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');


const app = express();
//importing routes
const personaRoutes = require('./routes/persona');

//settings 
app.set('port', process.env.PORT || 80);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'host',
    user: 'user',
    password: 'password',
    port: 3306,
    database: 'bd'
  }, 'single'));
  app.use(express.urlencoded({extended: false}));


//routes
app.use('/', personaRoutes);
// static files
app.use(express.static(path.join(__dirname, 'public')));

//starting server
app.listen(app.get('port'), () => {
    console.log('Server on port 80');
});

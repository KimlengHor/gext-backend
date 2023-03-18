const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const groomerRoutes = require('./routes/groomer');
var cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(groomerRoutes);

// const db = require('./utils/database');

// db.execute('SELECT * FROM groomers')
// .then(result => { 
//     console.log(result);
// })
// .catch(err => { 
//     console.log(result);
// });

app.listen(3000);
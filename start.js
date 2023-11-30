
const express = require('express');
const start = express();


start.use(express.json());
start.use(express.urlencoded({extended: false}));

start.use('/', require('../Clinica_Dental/control_paciente'));
start.use('/', require('../Clinica_Dental/control_registro'));

start.set('view engine', 'ejs');

start.listen(4000, ()=>{
    console.log('SERVER en http://localhost:4000');
});
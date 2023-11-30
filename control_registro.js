const express = require('express');
const control_registro = express.Router();
const path = require('path');
const db = require('./database/db');

//css
control_registro.use(express.static(path.join(__dirname,'public')));

//Mostrar registros
control_registro.get('/read_registro', (req, res) => {
    db.all('SELECT * FROM cita', (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }else{
            res.render('../views/read_registro', { citas: results });
            //results.send(results); //->Mostrar la base de datos sin formato
        }

    });
});

//Crear registros
control_registro.get('/registro', (req, res) => {
    res.render('../views/registro');
});

control_registro.post('/read', (req, res) => {
    const { idcita, fecha, motivo, idpaciente } = req.body;
    
    const sql = 'INSERT INTO cita (id_cita, fecha, motivo, id_paciente) VALUES (?, ?, ?, ?)';
    const params = [idcita, fecha, motivo, idpaciente];

    db.run(sql, params, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.redirect('/home');
    });
});

module.exports = control_registro;
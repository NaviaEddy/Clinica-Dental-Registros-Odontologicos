const express = require('express');
const control_paciente = express.Router();
const path = require('path');
const db = require('./database/db');


//css
control_paciente.use(express.static(path.join(__dirname,'public')));

//Login
control_paciente.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'web', 'security', 'login.html'));
});

//Pagina principal
control_paciente.get('/home', (req, res)=>{
    res.render('home.ejs')
});

//Mostrar registros
control_paciente.get('/read', (req, res) => {
    db.all('SELECT * FROM paciente', (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }else{
            res.render('../views/read', { pacientes: results });
            //results.send(results); //->Mostrar la base de datos sin formato
        }

    });
});

//Crear pacientes
control_paciente.get('/create', (req, res) => {
    res.render('../views/create');
});

control_paciente.post('/create', (req, res) => {
    const { foto, nombre, cedula, direccion, celular, doctor, nacimiento } = req.body;
    
    const sql = 'INSERT INTO paciente (foto, nombre, cedula, direccion, celular, doctor, fech_nac) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const params = [foto, nombre, cedula, direccion, celular, doctor, nacimiento];

    db.run(sql, params, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.redirect('/home');
    });
});

//Editar pacientes
control_paciente.get('/edit/:id', (req, res) => {
    const pacienteId = req.params.id;
    
    db.get('SELECT * FROM paciente WHERE id_paciente = ?', [pacienteId], (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.render('../views/edit', {paciente: result} );
    });
    
});

control_paciente.post('/edit/:id', (req, res) => {
    const pacienteId = req.params.id;
    const { foto, nombre, cedula, direccion, celular, doctor, nacimiento } = req.body;

    const sql = 'UPDATE paciente SET foto=?, nombre=?, cedula=?, direccion=?, celular=?, doctor=?, fech_nac=? WHERE id_paciente=?';
    const params = [foto, nombre, cedula, direccion, celular, doctor, nacimiento, pacienteId];

    db.run(sql, params, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.redirect('/home');
    });
});

//Eliminar pacientes
control_paciente.get('/delete/:id', (req, res) => {
    const pacienteId = req.params.id;

    db.run('DELETE FROM paciente WHERE id_paciente = ?', [pacienteId], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.redirect('/home');
    });
});

module.exports = control_paciente;
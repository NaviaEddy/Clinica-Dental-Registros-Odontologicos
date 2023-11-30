const sqlite3 = require('sqlite3').verbose();

const path = require('path');

const dbPath = path.resolve(__dirname, '../Clinica_dental.sqlite'); 

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al abrir la base de datos', err.message);
    } else {
        console.log('!BASE DE DATOS CONECTADA¡');
    }
});

module.exports = db;
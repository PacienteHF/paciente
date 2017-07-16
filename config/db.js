var mongoose = require('mongoose');

module.exports = function() {
    //mongoose.connect("mongodb://localhost/saude");
    mongoose.connect("mongodb://pacientemaster:pacientehf@ds027145.mlab.com:27145/saude");

    mongoose.connection.on('connected', function() {
        console.log('mongo conectado');
    });

    mongoose.connection.on('disconnected', function() {
        console.log('mongo desconectado');
    });

    mongoose.connection.on('error', function() {
        console.log('erro na conexão com mongo');
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log('bye mongo');
            process.exit(0);
        });
    });
}
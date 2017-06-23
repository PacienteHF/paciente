var jsonfile = require('jsonfile');
var path = 'dados-completos.json';

jsonfile.readFile(path, function(err, estabelecimentos) {
  // Filtra os estabelecimentos que atendem SUS e possuem dados lat/long completos
  var validos = estabelecimentos.filter(function(estabelecimento) {
    return !(estabelecimento['LATITUDE'] === null ||
           estabelecimento['LONGITUDE'] === null) &&
           estabelecimento['ATENDE SUS'] === "SIM";
  });

  var pathFiltrados = 'dados-validos.json';
  jsonfile.writeFile(pathFiltrados, validos, function (err) {
    console.error(err);
  });
});

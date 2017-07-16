var app = require('./config/app');
require("./config/db")();

app.listen(3000, function() {
  console.log("Server Running!");
});

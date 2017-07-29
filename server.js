var app = require('./config/app');
require("./config/db")();

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
    console.log("Server Running!");
});

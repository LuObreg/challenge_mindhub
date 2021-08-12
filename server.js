const { app, port } = require('./app');
const passport = require("./passport");


//passport middleware
app.use(passport.initialize());
   
app.listen (port, () => {
	console.log("El servidor se está ejecutando en el port " + port);
});
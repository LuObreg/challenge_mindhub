const { app, port } = require('./app');
app.listen (port, () => {
	console.log("El servidor se está ejecutando en el port " + port);
});
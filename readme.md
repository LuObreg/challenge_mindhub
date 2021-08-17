# MyTinerary

### Seguridad
Se utilizan passport y JWT para autenticación y autorización de los datos en el login.
Se utiliza bcrypt para encriptar las passwords del usuario.

### Test
Se testea con jest uno de los endpoints para /api/cities y api/itineraries

### Validación
Se utiliza express-validator para validar los datos

## Aclaración
Al crear un nuevo usuario puede surgir un error desde el frontend. Esto se debe a que no se llegó a solucionar un error por el cual al registrar un nuevo usuario sus datos no quedan guardados en local storage. Si uno cierra sesión y vuelve a iniciarla puede navegarse normalmente.

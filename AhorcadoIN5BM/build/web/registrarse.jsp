<%--
    Document   : registrarse
    Created on : 6 sept 2025
    Author     : Adrian Alvarez
--%>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registro | AhorcadoMF</title>
        <link rel="stylesheet" href="Styles/index.css">
    </head>
    
    <body>
        <div class="login-contendor">
            <h2>Registro</h2>
            <p>Ingresa tus datos para registrarte</p>
            
            <form action="validacion" method="POST">
                <input type="text" name="txtUsuario" placeholder="Usuario" required />
                <input type="password" name="txtContrasena" placeholder="Contraseña" required />
                <button type="submit" name="accion" value="Registrarse">Registrarse</button>
            </form>
            
            <p class="login-link">¿Ya tienes cuenta? <a href="index.jsp">Iniciar sesión</a></p>
            
        </div>
    </body>
</html>

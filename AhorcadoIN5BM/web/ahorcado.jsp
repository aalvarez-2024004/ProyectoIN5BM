<%--
    Document   : index
    Created on : 2 sept 2025, 08:09:27
    Author     : Adrian Alvarez
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AhorcadoMF | A.A 2024004</title>
        <link rel="stylesheet" href="Styles/ahorcado.css">
        <script src="js/ahorcado.js"></script>
    </head>

    <body>
        <div class="contenedor">
            <div class="titulo">ahorcadoMF</div>
            <div class="temporizador">Temporizador: 05:00</div>
            <div class="area-juego">
                <div class="muneco">
                    <div class="marco-muneco">
                        <img src="img/BaseAhorcado.jpg" alt="Muñeco Ahorcado" class="imagen-muneco">
                    </div>
                </div>
                <div class="area-principal">
                    <div class="palabra"></div>
                    <!-- Contenedor para mostrar las pistas de texto -->
                    <div class="pista-texto"></div>
                    <div class="teclado">
                        <button>A</button>
                        <button>B</button>
                        <button>C</button>
                        <button>D</button>
                        <button>E</button>
                        <button>F</button>
                        <button>G</button>
                        <button>H</button>
                        <button>I</button>
                        <button>J</button>
                        <button>K</button>
                        <button>L</button>
                        <button>M</button>
                        <button>N</button>
                        <button>Ñ</button>
                        <button>O</button>
                        <button>P</button>
                        <button>Q</button>
                        <button>R</button>
                        <button>S</button>
                        <button>T</button>
                        <button>U</button>
                        <button>V</button>
                        <button>W</button>
                        <button>X</button>
                        <button>Y</button>
                        <button>Z</button>
                                       </div>
                    <div class="pistas">
                        <button>Pista 1</button>
                        <button>Pista 2</button>
                        <button>Pista 3</button>
                    </div>
                    <div class="controles">
                        <button class="iniciar">Iniciar</button>
                        <button class="reiniciar">Reiniciar</button>
                        <button class="pausar">Pausar</button>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>

document.addEventListener("DOMContentLoaded", () => {

    // Fases de las imagenes del ahorcado por arrayList
    const imagenes = [
        "img/BaseAhorcado.jpg", // Base
        "img/Ahorcado1.jpg",    // 1 cuerda
        "img/Ahorcado2.jpg",    // 2 cabeza
        "img/Ahorcado3.jpg",    // 3 cuerpo
        "img/Ahorcado4.jpg",    // 4 brazo
        "img/Ahorcado5.jpg",    // 5 brazo
        "img/Ahorcado6.jpg",    // 6 pierna
        "img/Ahorcado7.jpg"     // 7 pierna
    ];

    let palabraSeleccionada = "";
    let palabraOculta = [];
    let intentos = 0;
    let tiempoRestante = 300; // 5 minutos
    let temporizador;
    let juegoPausado = false;
    const maxIntentos = imagenes.length - 1;

    // pistas que vienen de la BD
        let pistasActuales = [];

    // Elementros del html referenciados
    const imgAhorcado = document.querySelector(".imagen-muneco");
    const wordContainer = document.querySelector(".palabra");
    const teclas = document.querySelectorAll(".teclado button"); 
    const btnIniciar = document.querySelector(".iniciar");
    const btnReiniciar = document.querySelector(".reiniciar");
    const btnPausar = document.querySelector(".pausar");
    const btnPistas = document.querySelectorAll(".pistas button");
    const temporizadorElement = document.querySelector(".temporizador");

    //Funcion para obtener la palara desde el servlet ControladorPalabras
    async function obtenerPalabra() {
        try {
            const response = await fetch("ControladorPalabras"); // Servlet
            if (!response.ok) throw new Error("Error al obtener palabra");

            const infoDb = await response.json();
            return {
                palabra: infoDb.palabra.toUpperCase(),
                pistas: [infoDb.pista1, infoDb.pista2, infoDb.pista3]
            };
        } catch (error) {
            return null;
        }
    }

    
    // Funcion para iniciar un jjuego nuevo
    async function iniciarJuego() {
        intentos = 0;
        tiempoRestante = 300;
        juegoPausado = false;
        btnPausar.textContent = "Pausar";

        const palabraObj = await obtenerPalabra(); //Espera la palabra desde el serlet
        if (!palabraObj) {
            alert("No se pudo obtener palabra de la base de datos.");
            return;
        }

        palabraSeleccionada = palabraObj.palabra;
        pistasActuales = palabraObj.pistas;

        palabraOculta = Array(palabraSeleccionada.length).fill("_");

        imgAhorcado.src = imagenes[intentos];
        actualizarPalabra();
        activarTeclado(true);
        reiniciarPistas();
        iniciarTemporizador();
    }

    //Funcion para reiniciar el intento pero con la misma palabra
    function reiniciarJuego() {
        intentos = 0;
        tiempoRestante = 300;
        juegoPausado = false;
        btnPausar.textContent = "Pausar";

        palabraOculta = Array(palabraSeleccionada.length).fill("_");

        imgAhorcado.src = imagenes[intentos];
        actualizarPalabra();
        activarTeclado(true);
        reiniciarPistas();
        iniciarTemporizador();
    }

    //Actualizar la palabra con las letras que el usuaroi ya ha adivinado
    function actualizarPalabra(){
        wordContainer.textContent = palabraOculta.join(" ");
    }

    //Manejo de intentos (si el usuario llega a 7) el usuario pierde
    function intento(letra, boton){
        if (juegoPausado) return;
        boton.disabled = true; // desactiva la letra que se uso
        let acierto = false;

        //Esto hara que se revise si la letra existe en la palabra
        palabraSeleccionada.split("").forEach((char, i) => {
            if (char == letra) {
                palabraOculta[i] = letra;
                acierto = true;
            }
        });

        if (acierto) {
            actualizarPalabra();
            verificarGanar();
        }else {
            //Si no es la letra correcta se suman los intentos
            //y se cambia la imagen
            intentos++;
            imgAhorcado.src = imagenes[intentos];

            if (intentos === maxIntentos) {
                clearInterval(temporizador);
                alert("Perdiste, suerte a la proxima :D La palabra era " + palabraSeleccionada);
                activarTeclado(false);
            }
        }
    }

    //Verificar si el usuario gano
    function verificarGanar(){
        if (!palabraOculta.includes("_")) {
            clearInterval(temporizador);
            alert("Ganaste! Felicidades <3");
            activarTeclado(false);
        }
    }

     //Poder activar o descativar el teclado en pantalla
    function activarTeclado(estado) {
      teclas.forEach(boton => {
        boton.disabled = !estado;
      });
    }

      //Funcion para el temporizador que tiene 5 minutos como maximo
      //Si el juego esta pausado no sigue avanzando el tiempo
      //Si s termina el tiempo sale una alerta
     function iniciarTemporizador(){

        clearInterval(temporizador);
        actualizarTemporizador();

        temporizador = setInterval(() => {
            if (juegoPausado)
                return;
            tiempoRestante--;
            actualizarTemporizador();
            if (tiempoRestante < 0) {
                clearInterval(temporizador);
                alert("Se te termino el tiempo! La palabra era: " + palabraSeleccionada);
                activarTeclado(false);
          }
      }, 1000);
    }

    //Hacer que el temporizador muestre el tiempo en formato de minutos, segundos
    function actualizarTemporizador() {
        const minutos = Math.floor(tiempoRestante / 60);
        const segundos = tiempoRestante % 60;
        temporizadorElement.textContent = `Temporizador: ${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    }

    //Hacer que las pistas coordinen con la palabra
    function reiniciarPistas(){
        btnPistas.forEach((b,i)=> {
            b.disabled = false;
        });
    }

    //Funcion que permite mostrar las 3 pistas de la palabra con el botonnn
    function mostrarPista(index) {
        if (juegoPausado)
            return;
        if (pistasActuales && pistasActuales[index]) {
            const pistaTexto = document.querySelector(".pista-texto");
            pistaTexto.textContent = pistasActuales[index];
            btnPistas[index].disabled = true;
        }
    }
    
    // Función para reiniciar las pistas
    function reiniciarPistas() {
        btnPistas.forEach((b, i) => {
            b.disabled = false;
        });
        document.querySelector(".pista-texto").textContent = "";
    }

    //Hacer que si el boton esta en pausa tenga la opcion de ponerse en reanudar
    //Hacer que si el boyon esta en reaunidacion tenga la opcion de ponerse en pause
    function pausarReanudar() {
        juegoPausado = !juegoPausado;
        btnPausar.textContent = juegoPausado ? "Reanudar" : "Pausar";
    }

    btnIniciar.addEventListener("click", iniciarJuego);   // empieza nueva palabra
    btnReiniciar.addEventListener("click", reiniciarJuego); // reinicia misma palabra
    btnPausar.addEventListener("click", pausarReanudar);  // pausa o reanuda

    // cada letra del teclado
    teclas.forEach(boton => {
        boton.addEventListener("click", () => {
            intento(boton.textContent, boton);
        });
    });

    // botones de pistas
    btnPistas.forEach((boton, index) => {
        boton.addEventListener("click", () => {
            mostrarPista(index);
        });
    });

    activarTeclado(false);   // teclado desactivado hasta iniciar
    actualizarTemporizador(); // muestra tiempo inicial
});
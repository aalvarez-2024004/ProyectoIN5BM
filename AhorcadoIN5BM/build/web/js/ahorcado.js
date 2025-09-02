document.addEventListener("DOMContentLoaded", () => {

    // Configuracion de palabras:
      const palabras = [
        { palabra: "LEOPARDO", pistas: ["img/leopardo1.jpg", "img/leopardo2.jpg", "img/leopardo3.jpg"] },
        { palabra: "GUITARRA", pistas: ["img/guitarra1.jpg", "img/guitarra2.jpg", "img/guitarra3.jpg"] },
        { palabra: "TELEFONO", pistas: ["img/telefono1.jpg", "img/telefono2.jpg", "img/telefono3.jpg"] },
        { palabra: "INTERNET", pistas: ["img/internet1.jpg", "img/internet2.jpg", "img/internet3.jpg"] },
        { palabra: "AUTOMOVIL", pistas: ["img/automovil3.jpg", "img/automovil2.jpg", "img/automovil3.jpg"] }
    ];

    // Fases de las imagenes del ahorcado
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

    // Variables de control
      let palabraSeleccionada = "";
      let palabraOculta = [];
      let intentos = 0;
      let tiempoRestante = 300; // 5 minutos
      let temporizador;
      let juegoPausado = false;
      const maxIntentos = imagenes.length - 1;
      let palabraActualIndex = 0;

    // Elementros del html referenciados
    const imgAhorcado = document.querySelector(".imagen-muneco");
    const wordContainer = document.querySelector(".palabra");
    const teclas = document.querySelectorAll(".teclado button"); 
    const btnIniciar = document.querySelector(".iniciar");
    const btnReiniciar = document.querySelector(".reiniciar");
    const btnPausar = document.querySelector(".pausar");
    const btnPistas = document.querySelectorAll(".pistas button");
    const temporizadorElement = document.querySelector(".temporizador");

    // Funcion para iniciar un jjuego nuevo
    function iniciarJuego(){
        intentos = 0;
        tiempoRestante = 300;
        juegoPausado = false;
        btnPausar.textContent = "Pausar";

        //Asignar una nueva palabra al ahorcado
        palabraActualIndex = Math.floor(Math.random() * palabras.length);
        palabraSeleccionada = palabras[palabraActualIndex].palabra;

        //Mide la longitud de la palabra seleccionada y la llena con _
        palabraOculta = Array(palabraSeleccionada.length).fill("_");

        //Reiniciar la imagen y los demas elementos visuales
        imgAhorcado.src = imagenes[intentos];
        actualizarPalabra();
        activarTeclado(true);
        reiniciarPistas();

        //Inicia el temporizador
        iniciarTemporizador();
        console.log("Palabra seleccionada:", palabraSeleccionada);
    }

    //Funcion para reiniciar el intento pero con la misma palabra
    function reiniciarJuego(){
        intentos = 0;
        tiempoRestante = 300;
        juegoPausado = false;
        btnPausar.textContent = "Pausar";

        //otra vez se mide la longitud de la palabra seleccionada y la llena con _
        palabraOculta = Array(palabraSeleccionada.length).fill("_");

        //Reiniciar la imagen y los demas elementos visuales
        imgAhorcado.src = imagenes[intentos];
        actualizarPalabra();
        activarTeclado(true);
        reiniciarPistas();

        //Se vuelve a reiniciar el temporizados
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
                alert("Perdiste, suerte a la proxima! La palabra era" + palabraSeleccionada);
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
            return; // si el juego en pausa, no muestra nada

        const pistas = palabras[palabraActualIndex].pistas;
        if (pistas && pistas[index]) {
            // se crea el modelo de la imagen
            const img = document.createElement("img");
            img.src = pistas[index];
            img.style.maxWidth = "300px";
            img.style.maxHeight = "300px";

            const modal = document.createElement("div");
            modal.style.position = "fixed";
            modal.style.top = "0";
            modal.style.left = "0";
            modal.style.width = "100%";
            modal.style.height = "100%";
            modal.style.backgroundColor = "rgba(0,0,0,0.8)";
            modal.style.display = "flex";
            modal.style.justifyContent = "center";
            modal.style.alignItems = "center";
            modal.style.zIndex = "1000";
            modal.appendChild(img);

            // cerrar la imagen al hacer click
            modal.onclick = () => document.body.removeChild(modal);
            document.body.appendChild(modal);

            // esto hace que si uso la pista, no se pueda volver a ver
            btnPistas[index].disabled = true;
        }
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
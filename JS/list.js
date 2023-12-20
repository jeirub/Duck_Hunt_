// Array llamado players vacío que se utiliza para ir agregando los jugadores.
// DATOS
let players = [];

// LÓGICA


// cuando eliminamos un usuario genera un sonido característico.
let soundDeletePlayer = new Audio("../SOUND/sonido_trash.mp3")


// Función para eliminar jugadores de la lista.
const deleteButtonHandler = (e) => {
  // Obtiene el ID del jugador a eliminar del elemento que desencadenó el evento
  let idToDelete = e.target.id;

  // Filtra el arreglo "players" para eliminar el jugador con el ID correspondiente
  players = players.filter((player) => player.id != idToDelete);

  // Llama a la función "guardarEnStorage" para actualizar el almacenamiento con la lista de jugadores actualizada
  guardarEnStorage(players);

  // Llama a la función "render" para actualizar la interfaz de usuario
  render();

  // Reproduce un sonido (assumiendo que "soundDeletePlayer" es un objeto de audio definido en otro lugar)
  soundDeletePlayer.play();
};


// Añadimos jugador a la lista.
let btnAddPlayer = document.getElementById("addPlayer");

//sonido cuando agregamos jugador a la lista
let soundAddPlayer = new Audio("../SOUND/sonido_boton_1.mp3")

// Selecciona el elemento del botón con el id "btnAddPlayer" y agrega un evento de clic
btnAddPlayer.addEventListener("click", (e) => {
  e.preventDefault(); // Previene el comportamiento predeterminado de recargar la página al hacer clic

  // Obtiene el elemento de entrada de jugador con el id "inputPlayer"
  let inputPlayer = document.getElementById("inputPlayer");

  // Genera un nuevo identificador para el jugador basado en la longitud del arreglo "players"
  let idNewPlayer = players.length;

  // Obtiene el nombre del nuevo jugador desde el valor del campo de entrada
  let nameNewPlayer = inputPlayer.value;

  // Verifica si el campo de entrada está vacío
  if (inputPlayer.value == "") {
    // Muestra una alerta si el campo de entrada está vacío
    alert("Please enter a valid name");
  } else {
    // Si el campo de entrada no está vacío, agrega un nuevo jugador al arreglo "players"
    players.push({
      id: idNewPlayer,
      playerName: nameNewPlayer,
      isDead: false,
    });
  }

  // Limpia el campo de entrada
  inputPlayer.value = "";

  // Reproduce un sonido (assumiendo que "soundAddPlayer" es un objeto de audio definido en otro lugar)
  soundAddPlayer.play();

  // Llama a la función "render" para actualizar la interfaz de usuario
  render();

  // Llama a la función "guardarEnStorage" para almacenar los cambios en el almacenamiento
  guardarEnStorage(players);
});



/**
 * Actualiza la interfaz de usuario con la lista de jugadores y agrega manejadores de eventos
 */
const render = () => {
  // Inicializa una cadena HTML vacía para almacenar los elementos de la lista de jugadores
  let htmlPlayers = ``;

  // Obtiene el elemento de la lista de jugadores del documento con el ID "listOfPlayers"
  let listPlayers = document.getElementById("listOfPlayers");

  // Itera a través de cada jugador en el arreglo "players" y genera un elemento HTML para cada uno
  players.forEach(
    (player) =>
      (htmlPlayers += `<li class="item_list_player" >
          <p class="player_name">${player.playerName}</p>
          <i class="bi bi-trash-fill player_delete" id="${player.id}"></i>
          </li>`)
  );

  // Asigna la cadena HTML generada a la propiedad "innerHTML" del elemento de la lista de jugadores
  listPlayers.innerHTML = htmlPlayers;

  // Llama a la función "addDeleteButton" para agregar manejadores de eventos a los botones de eliminación
  addDeleteButton();
};

/**
 * Agrega manejadores de eventos a los botones de eliminación de jugadores
 */
const addDeleteButton = () => {
  // Obtiene todos los elementos con la clase "player_delete" que representan los botones de eliminación
  let deletePlayer = document.querySelectorAll(".player_delete");

  // Agrega un manejador de evento "click" a cada botón de eliminación que llama a la función "deleteButtonHandler"
  deletePlayer.forEach((deleteButton) =>
    deleteButton.addEventListener("click", deleteButtonHandler)
  );
};

// Llama a la función "render" para inicializar la interfaz de usuario
render();

/**
 * Almacena un objeto en el almacenamiento local como una cadena JSON
 */
function guardarEnStorage(object) {
  let playersLocal = object;

  // Almacena el objeto en el almacenamiento local con la clave "playersKey" en formato JSON
  localStorage.setItem("playersKey", JSON.stringify(playersLocal));
}

// Selecciona el elemento del botón con el ID "goPlay"
const Play = document.getElementById("goPlay");

// Agrega un manejador de evento "click" al botón para redirigir al juego o mostrar una alerta
Play.addEventListener("click", (e) => {
  // Recupera la lista de jugadores desde el almacenamiento local
  let players = JSON.parse(localStorage.getItem("playersKey"));

  // Comprueba si hay al menos dos jugadores para permitir la transición al juego
  if (players.length > 1) {
    Play.href = "./game.html"; // Redirige al juego
  } else {
    alert("You need at least two players to start."); // Muestra una alerta si no hay suficientes jugadores
  }
});

// Selecciona el elemento de audio con el ID 'audioElement' y el botón para alternar el sonido con el ID 'toggleSound'
const audioElement = document.getElementById('audioElement');
const toggleSoundButton = document.getElementById('toggleSound');

let isSoundOn = true;

// Agrega un manejador de evento al botón para alternar el sonido
toggleSoundButton.addEventListener('click', () => {
  if (isSoundOn) {
    audioElement.pause(); // Pausa la reproducción del audio
    toggleSoundButton.textContent = 'Encender Sonido'; // Cambia el texto del botón
  } else {
    audioElement.play(); // Reproduce el audio
    toggleSoundButton.textContent = 'Apagar Sonido'; // Cambia el texto del botón
  }
  
  isSoundOn = !isSoundOn; // Cambia el estado del sonido (encendido o apagado)
});


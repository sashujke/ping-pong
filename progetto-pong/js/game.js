/**
* Implementazione del videogioco Pong.
* @author Scorza Michael
* @version 1.0
*/


const STAGE_ID = "stage";
const STAGE_X = 10;
const STAGE_Y = 40;
const STAGE_WIDTH = 640;
const STAGE_HEIGHT = 400;
const BACKGROUND = "assets/background.png";
const PLAYER1 = "assets/player1.png";
const PLAYER2 = "assets/player2.png";
const BALL = "assets/ball.png";
const HIT = "assets/hit.wav";
const BG_SONG = "assets/bgsong.mp3";


//---------------------------------------------------------
/**
* Classe per la gesitione di uno sfondo
*
*/
class Background extends Sprite {
  /**
  * Crea un nuovo oggetto Background.
  * @param {string} path - percorso della risorsa
  * @param {number} width - larghezza dello sfondo
  * @param {number} height - Altezza dello sfondo
  */
  constructor(path, width, height) {
    super(path, width, height);

  }
}
//---------------------------------------------------------
/*
* classe per la gestione di una palla
*/
class Ball extends Sprite {
  /**
  * Crea un nuovo oggetto Background.
  * @param {string} path - percorso della risorsa
  * @param {number} width - larghezza dello palla
  * @param {number} height - Altezza dello palla
  */
  constructor(path, width, height) {
    super(path, width, height);
  }

  /* esegue un rimbalzo orizzontale della palla
  */
  bouncex(){
    this.speed.x = -this.speed.x; // inverte la velocità orizzontale
  }
  bouncey(){
    this.speed.y = -this.speed.y;
  }

/*aggiorna lo stato della pallina*/ 
  update(){
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}
//---------------------------------------------------------

class Player extends Sprite {
  /**
  * Crea un nuovo oggetto Background.
  * @param {string} path - percorso della risorsa
  * @param {number} width - larghezza dello sfondo
  * @param {number} height - Altezza dello sfondo
  */
  constructor(path, width, height) {
    super(path, width, height);
    this.score = 0;
    this.up = new Key("w");
    this.down = new Key("s");
  }

  /*aggiorna stato giocatore*/ 
  update(){
    if(this.up.pressed){
      this.position.y -= this.speed.y;
    }
    else if(this.down.pressed){
      this.position.y += this.speed.y;
    }
  }

  /* gestisce l'evento relativo al rilascio dei tasti UP & DOWN
  * @param {Object} e - evento associato alla pressione dei tasti
  * 
  */
  keyUpHandler(e){
   this.up.keyUpHandler(e);
   this.down.keyUpHandler(e);
  }

  /* gestisce l'evento relativo alla pressione dei tasti UP & DOWN
  * @param {Object} e - evento associato alla pressione dei tasti
  */
  keyDownHandler(e){
    this.up.keyDownHandler(e);
    this.down.keyDownHandler(e);
  }
}


//---------------------------------------------------------
class Game {

  /*crea un nuovo oggetto Game*/
  constructor() {
    this.background = new Background(BACKGROUND, STAGE_WIDTH, STAGE_HEIGHT);
    this.ball = new Ball(BALL, 16, 16)
    this.player1 = new Player(PLAYER1, 15, 100);
    this.initialize();
  }

  keyUpHandler(e){
    this.player1.keyUpHandler(e);
  }

  keyDownHandler(e){
    this.player1.keyDownHandler(e);
  }

  /*inizializza gli oggetti*/
  initialize(){
    this.ball.position.set(50, (STAGE_HEIGHT - this.ball.height) / 2);
    this.ball.speed.set(10, 10);
    this.player1.position.set(3, (STAGE_HEIGHT - this.player1.height) / 2);
    this.player1.speed.set(0, 10);
    this.player1.score = 0;
  }

  /*aggiorna lo stato di tutti gli oggetti*/
  update() {
    this.ball.update();
    this.player1.update();
  }

  /*disegna tutti gli oggetti*/
  draw() {
    this.background.draw();
    this.ball.draw();
    this.player1.draw();
  }
}

//---------------------------------------------------------

init(STAGE_ID, STAGE_X, STAGE_Y, STAGE_WIDTH, STAGE_HEIGHT);
let game = new Game();

/*
* gestisce l'aggiornamento del gioco ad ogni frame.
* @param {number} time - tempo trascorso dall'ultimo frame
*/
function run(time){
  game.update();
  game.draw(); 
  raf = requestAnimationFrame(run);
}

/*
* gestisce l'evevnto del pulsante NEW GAME
*/
function btnNewGameClick(){
  game.initialize(); // inizializza il gioco
  cancelAnimationFrame(raf); // resetta il gioco
  raf = requestAnimationFrame(run); // avvia il gioco
}

/*
* gestisce l'evevnto relativo al caricamneto della pagina web
* @param {number} time - parametro relativo all'evento
*/
function loadHandLer(e){
  game.draw(); 
}

function keyUpHandler(e){
  game.keyUpHandler(e);
}

function keyDownHandler(e){
  game.keyDownHandler(e);
}

window.addEventListener("load", loadHandLer);
window.addEventListener("keyup", keyUpHandler);
window.addEventListener("keydown", keyDownHandler);
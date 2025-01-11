/**
* Implementazione del videogioco Pong.
* @author Siarou Aliaksandr
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
/**
* Classe per la gesitione di una palla
*/
class Ball extends Sprite {
	 /**
  * Crea un nuovo oggetto Ball.
  * @param {string} path - percorso della risorsa
  * @param {number} width - larghezza dello sfondo
  * @param {number} height - Altezza dello sfondo
  */
  constructor(path, width, height) {
    super(path, width, height);

  }
/**
* Esegue un rimbalzo orizzontale
*/
	bouncex() {
		this.speed.x = -this.speed.x;
	}
	
	bouncey() {
		this.speed.y = -this.speed.y;
	}
/**
* Aggiorna lo stato della palla
*/
	update() {
		this.position.x += this.speed.x;
		this.position.y += this.speed.y;
	}
}

//----------------------------------------------------------------
/**
* Classe per la gestione di un giocatore
*/
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

/**
* Aggiorna lo stato di un giocatore
*/
update() {
	if (this.up.pressed) {
		this.position.y -= this.speed.y; 
	}
	else if (this.down.pressed) {
		this.position.y += this.speed.y; 
	}
}
/**
* Gestivce evento relativo al rilascio dei tasti up e down
*/
keyUpHandler(e) {
	this.up.keyUpHandler(e);
	this.down.keyUpHandler(e);
}

/**
* Gestivce evento relativo alla pressione dei tasti up e down
*/
keyDownHandler(e) {
	this.up.keyDownHandler(e);
	this.down.keyDownHandler(e);
}
}
//---------------------------------------------------------
class Game {
  constructor() {
    this.background = new Background(BACKGROUND, STAGE_WIDTH, STAGE_HEIGHT);
	this.ball = new Ball(BALL, 16, 16);
	this.player1 = new Player (PLAYER1, 15, 100);
	this.initialize();
  }
/**
* Inizializza gli oggetti
*/
  initialize() {
	this.ball.position.set(50, ((STAGE_HEIGHT - this.ball.height) / 2));
	this.ball.speed.set(10, 10);
	this.player1.position.set (3,((STAGE_HEIGHT - this.player1.height) / 2) )
	this.player1.speed.set (0, 10);
	this.player1.score = 0;
  }

keyUpHandler(e) {
	this.player1.keyUpHandler(e);
}
keyDownHandler(e) {
	this.player1.keyDownHandler(e);
}
  /**
* Aggiorna lo stato degli oggetti
*/
  update() {
		this.ball.update();
  }

  /**
* Disegna gli oggetti
*/
  draw() {
    this.background.draw();
	this.ball.draw();
	this.player1.draw();
  }
}

init(STAGE_ID,STAGE_X, STAGE_Y, STAGE_WIDTH, STAGE_HEIGHT);
let game = new Game();

//--------------------------------------------------------

/*
* Gestise l aggiornamento del gioco a ogni frame
* @param {number} time - tempo
*/
function run(time) {
	game.update();
	game.draw();
	raf = requestAnimationFrame(run);
	}
/*
* Gestise l evento onclick del button new game
*/
function btnNewGameClick() {
 	game.initialize();
	cancelAnimationFrame(raf);
 	raf = requestAnimationFrame(run);
	
}

/*
* Gestice l evento relativo al caricamento della pagina web
* @param {Object} e - Parametro relativo all evento
*/ 
function loadHandler(e) {
	game.draw();
}

function keyUpHandler(e) {
	game.keyUpHandler(e);
}
function keyDownHandler(e) {
	game.keyDownHandler(e);
}

window.addEventListener("load", loadHandler);
window.addEventListener("keyup", keyUpHandler);
window.addEventListener("keydown", keyDownHandler);

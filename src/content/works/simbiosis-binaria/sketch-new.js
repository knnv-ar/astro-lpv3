let pasto;
let cielo;
let fuego;
let aire;
let agua;
let tierra;
let texturActual1;
let texturaActual2;
let texturaActual3;
let texturaActual4;
let audio;
let audio1;
let negro;
let blanco;
let tam = 40;

/**
 * Función preload: Se ejecuta antes de setup.
 * Carga todos los recursos (videos, imágenes, sonidos)
 * usando las rutas proporcionadas por Astro a través de window.SKETCH_ASSETS.
 */
function preload() {
  // Obtenemos el objeto de assets una sola vez.
  // El `|| {}` asegura que el código no falle si SKETCH_ASSETS no está definido.
  const assets = window.SKETCH_ASSETS || {};

  // Cargamos todos los assets usando las rutas del objeto.
  cielo = createVideo(assets.cielo);
  pasto = createVideo(assets.pasto);
  negro = loadImage(assets.negro);
  blanco = loadImage(assets.blanco);
  audio = loadSound(assets.audio);
  audio1 = loadSound(assets.audio1);
}

/**
 * Función setup: Se ejecuta una vez al inicio.
 * Configura el lienzo y los elementos iniciales del sketch.
 */
function setup() {
  let canvas = createCanvas(600, 600, WEBGL);
  canvas.parent('div-sketch');

  cielo.size(600, 600);
  cielo.hide();
  cielo.loop();

  pasto.size(600, 600);
  pasto.hide();
  pasto.loop();

  // Obtenemos el objeto de assets de nuevo para los videos con callback.
  const assets = window.SKETCH_ASSETS || {};

  // Llama a las funciones Loaded cuando sus respectivos videos terminan de cargar.
  // Nota: hemos corregido 'mutes' a 'muted' en el video 'agua'.
  fuego = createVideo(assets.fuego, fuegoLoaded);
  fuego.size(tam);
  fuego.hide();
  fuego.loop();
  fuego.elt.muted = true;

  agua = createVideo(assets.agua, aguaLoaded);
  agua.size(tam);
  agua.hide();
  agua.loop();
  agua.elt.muted = true;

  aire = createVideo(assets.aire, aireLoaded);
  aire.size(tam);
  aire.hide();
  aire.loop();
  aire.elt.muted = true;

  tierra = createVideo(assets.tierra, tierraLoaded);
  tierra.size(tam);
  tierra.hide();
  tierra.loop();
  tierra.elt.muted = true;

  // Asignación inicial de texturas (sin cambios)
  texturaActual1 = fuego;
  texturaActual2 = agua;
  texturaActual3 = aire;
  texturaActual4 = tierra;

  // La reproducción de audio se iniciará con la interacción del usuario
  // para cumplir con las políticas de autoplay de los navegadores.
}

// --- Funciones de callback para videos (sin cambios) ---
function fuegoLoaded() {
  fuego.play();
  fuego.loop();
}
function aguaLoaded() {
  agua.play();
  agua.loop();
}
function aireLoaded() {
  aire.play();
  aire.loop();
}
function tierraLoaded() {
  tierra.play();
  tierra.loop();
}

// --- Función draw (sin cambios) ---
function draw() {
  //dibuja los planes de fondo
  push();
  noStroke();
  texture(cielo);
  translate(-10, -150, 0);
  plane(600, 300);
  pop();

  push();
  noStroke();
  texture(pasto);
  translate(-10, 150, 0);
  plane(600, 300);
  pop();

  //dibuja las figuras
  push();
  noStroke();
  texture(texturaActual1);
  translate(70, -90, 220);
  rotateX(frameCount * 0.009);
  rotateY(frameCount * 0.008);
  cylinder(tam);
  pop();

  push();
  noStroke();
  texture(texturaActual2);
  translate(70, 90, 220);
  rotateX(frameCount * 0.02);
  rotateY(frameCount * 0.006);
  ellipsoid(tam);
  pop();

  push();
  noStroke();
  texture(texturaActual3);
  translate(-70, -90, 250);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.005);
  cone(tam);
  pop();

  push();
  noStroke();
  texture(texturaActual4);
  translate(-70, 90, 250);
  rotateX(frameCount * 0.005);
  rotateY(frameCount * 0.01);
  box(tam * 1.2);
  pop();

  if (mouseIsPressed) {
    image(negro, 0, 0, -600, 600);
    image(negro, 0, 0, 600, -600);
    image(blanco, 0, 0, 300, 300);
    image(blanco, 0, 0, -300, -300);
  }
}

/**
 * Función mousePressed: Gestiona el inicio del audio y el cambio de texturas.
 * Es necesario para manejar las políticas de autoplay de los navegadores.
 */
function mousePressed() {
  // Inicia el contexto de audio si el navegador lo requiere.
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }

  // Inicia el audio de fondo si aún no se está reproduciendo.
  if (!audio.isPlaying()) {
    audio.loop();
  }
  
  audio1.play();
  audio.stop();

  texturaActual1 = tierra;
  texturaActual2 = fuego;
  texturaActual3 = agua;
  texturaActual4 = aire;
}

// --- Función mouseReleased (sin cambios) ---
function mouseReleased() {
  audio1.stop();
  audio.play();
  audio.loop();

  texturaActual1 = fuego;
  texturaActual2 = agua;
  texturaActual3 = aire;
  texturaActual4 = tierra;
}
"using strict"

// Constants and colours
// I'm from the UK, so I use colour with a 'u' in descriptions,  
// but not invariable names, mainly because I'm being lazy.
const gravity = new Vector(0, 0.2);
const colorStar = 'silver';
const colorHillB = '#080808'
const colorHillF = '#0f0f0f'
const colorGround = '#050505'
const colorSkyStart = '#150505'
const colorSkyEnd = '#101022'

// Lets make some variables to hold the assets and other stuff
let stars, ground, hills, fireworks
let frames = 1000;

// The setup runs once and initialises all the assets
function setup() {
	createCanvas(500, 500);
	stars = new Stars(60, 1, 2, colorStar, 8);
	hillsB = new Hills(3, 220, colorHillB);
	hillsF = new Hills(2, 120, colorHillF);
	ground = new Ground(20, colorGround);
	fireworks = new Fireworks(canvas.width / 2, ground.floor);
	fireworksLeft = new Fireworks(canvas.width / 5, ground.floor);
	fireworksRight = new Fireworks(canvas.width / 5 * 4, ground.floor);
}

// The animation loop that runs over and over and over
// It can be stopped by using noLoop()
function animate() {
	backgroundGradient(colorSkyStart, colorSkyEnd);
	stars.draw();
	hillsB.draw();
	hillsF.draw();
	fireworks.draw();
	fireworksLeft.draw();
	fireworksRight.draw();
	ground.draw();

	// Option to stop animation after a number of frames.
	// Its only  there to stop the fan on my laptop from starting, even 
	// though its not very loud or particularly distracting. 
	// frames should be set as a number in variable above.
	// frames < 0 ? noLoop() : frames--;
}

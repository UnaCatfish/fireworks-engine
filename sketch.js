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
	frames < 0 ? noLoop() : frames--;
}

//////////////////////////////////////////////////////////
// These are the assets that  make up the pretty picture

// Fireworks hold the rockets and 'cool' explosions
// in this phrase, 'cool' stands for circles of, of, light!
class Fireworks {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.rockets = [];
		this.explosions = [];
		this.spawn = this.spawnRate();
		this.spawnRocket();
	}

	draw() {
		this.rockets.forEach((rocket, index) => {
			rocket.draw()
			if (rocket.live <= 0) {
				this.newExplosion(rocket.position)
				this.rockets.splice(index, 1);
			}
		});

		for (let i = this.explosions.length - 1; i >= 0; i--) {
			if (this.explosions[i].opacity > 0) {
				this.explosions[i].draw();
				this.explosions[i].opacity -= 0.01;
			} else {
				this.explosions.splice(0, 1);
			}
		}
		this.spawnRocket();
	};

	newRocket() {
		this.rockets.push(new Rocket(this.x, this.y));
	}

	newExplosion(position) {
		this.explosions.push(new Explosion(position.x, position.y));
	}

	spawnRate() {
		return randomIntFromRange(100, 300);
	};

	spawnRocket() {
		if (this.spawn < 0) {
			this.spawn = this.spawnRate();
			this.newRocket();
		}
		this.spawn -= 1
	}

}

// A singular explosion used by  fireworks
class Explosion {
	constructor(x, y) {
		this.position = new Vector(x, y);
		this.color = this.getColor();
		this.opacity = 1;
	}
	draw() {
		ctx.save();
		fill(this.color);
		shadow(this.color, 200);
		ctx.globalAlpha = this.opacity;
		circle(this.position, 60);
		ctx.globalAlpha = 1
		ctx.restore();
	}
	getColor() {
		const r = Math.random() * 255;
		const g = Math.random() * 255;
		const b = Math.random() * 255;
		return `rgb(${r}, ${g}, ${b})`
	}
}

// A singular rocket used by  fireworks
class Rocket {
	constructor(x, y) {
		this.position = new Vector(x, y);
		let speed = Math.random() * 4 + 8;
		this.velocity = new Vector(Math.random() * 2 - 1, -speed);
		this.live = randomIntFromRange(50, 65);
	}

	draw() {
		fill('#531')
		circle(this.position, 2);
		this.position.add(this.velocity);
		this.velocity.add(gravity);
		this.live--;
	}
}

// The twinkle twinkle little stars
class Stars {
	constructor(qty, min, max, color, blur) {
		this.starArray = [];
		this.color = color;
		this.blur = blur;

		for (let i = 0; i < qty; i++) {
			let position = new Vector();
			position.x = Math.floor(Math.random() * canvas.width);
			position.y = Math.floor(Math.random() * canvas.height);
			const radius = randomIntFromRange(min, max);
			this.starArray.push({ position, radius });
		}
	}

	draw() {
		for (let star of this.starArray) {
			ctx.save();
			fill(this.color);
			shadow(this.color, this.blur);
			ctx.globalAlpha = Math.random() * 0.4 + 0.4;
			circle(star.position, star.radius);
			ctx.globalAlpha = 1;
			ctx.restore();
		};
	}
}

// The hills, alive with the sound of no music
// Though I may change that at  some point
class Hills {
	constructor(number, height, color) {
		this.number = number;
		this.height = height;
		this.color = color;
		this.width = canvas.width / this.number;
	}

	draw() {
		ctx.fillStyle = this.color;
		for (let i = 1; i < this.number + 1; i++) {
			ctx.beginPath();
			ctx.moveTo(i * this.width - (this.width * 2), canvas.height);
			ctx.lineTo(i * this.width - (this.width / 2), canvas.height - this.height);
			ctx.lineTo(i * this.width + this.width, canvas.height);
			ctx.closePath();
			ctx.fill();
		}

	}
}

// Its the ground, what more can I say!
class Ground {
	constructor(height, color) {
		this.height = height;
		this.color = color;
		this.floor = canvas.height - this.height;
	}

	draw() {
		fill(this.color);
		rect(0, this.floor, canvas.width, this.height);
	}
}
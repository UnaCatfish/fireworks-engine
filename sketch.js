let stars, ground, hills, fireworks;
let frames = 10000;
let spawn = 75;
const gravity = new Vector(0, 0.2);

function setup() {
	createCanvas(400, 400);
	stars = new Stars(60, 1, 2, 'silver', 8);
	hillsB = new Hills(3, 220, '#080808');
	hillsF = new Hills(2, 120, '#0f0f0f');
	ground = new Ground(20, '#050505');
	fireworks = new Fireworks(canvas.width / 2, canvas.height - ground.height);

}

function animate() {
	backgroundGradient('#150505', '#101022');
	stars.draw();
	hillsB.draw();
	hillsF.draw();
	fireworks.draw();
	ground.draw();

	if (spawn <= 0) {
		spawn = randomIntFromRange(20, 300);
		fireworks.newRocket();
	}
	spawn -= 1;

	if (--frames <= 0) {
		noLoop();
	}
}

class Fireworks {
	constructor(x, y) {
		this.rockets = [];
		this.explosions = [];
		this.x = x;
		this.y = y;
		this.newRocket();
	}

	draw() {
		this.rockets.forEach((rocket, index) => {
			rocket.draw()
			if (rocket.live <= 0) {
				this.newExplosion(rocket.position)
				this.rockets.splice(index, 1);
				// console.log('boom');
			}
		});

		for (let i = this.explosions.length - 1; i >= 0; i--) {
			if (this.explosions[i].opacity > 0) {
				this.explosions[i].draw();
				this.explosions[i].opacity -= 0.005;
			} else {
				this.explosions.splice(0, 1);
			}
		}
	};

	newRocket() {
		this.rockets.push(new Rocket(this.x, this.y));
	}

	newExplosion(position) {
		this.explosions.push(new Explosion(position.x, position.y));
	}
}

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

class Rocket {
	constructor(x, y) {
		this.position = new Vector(x, y);
		let speed = Math.random() * 4 + 8;
		this.velocity = new Vector(Math.random() * 3 - 1.5, -speed);
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

class Hills {
	constructor(number, height, color) {
		this.number = number;
		this.height = height;
		this.color = color;
	}

	draw() {
		ctx.fillStyle = this.color;
		let hillWidth = canvas.width / this.number;
		for (let i = 1; i < this.number + 1; i++) {
			ctx.beginPath();
			ctx.moveTo(i * hillWidth - (hillWidth * 2), canvas.height);
			ctx.lineTo(i * hillWidth - (hillWidth / 2), canvas.height - this.height);
			ctx.lineTo(i * hillWidth + hillWidth, canvas.height);
			ctx.closePath();
			ctx.fill();
		}

	}
}

class Ground {
	constructor(height, color) {
		this.height = height;
		this.color = color;
	}

	draw() {
		fill(this.color);
		rect(0, canvas.height - this.height, canvas.width, this.height);
	}
}
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
        this.explosions[i].opacity -= 0.013;
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
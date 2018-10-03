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
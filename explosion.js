// A singular explosion used by  fireworks
class Explosion {
  constructor(x, y) {
    this.position = new Vector(x, y);
    this.color = this.getColor();
    this.opacity = 1;
    this.particles = [];
    this.numParticles = 50;

    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push(particle.create(this.position.x,
        this.position.y,
        Math.random() * 2 + 1,
        Math.random() * Math.PI * 2,
        0.1))
    }

  }
  draw() {
    ctx.save();

    for (let i = 0; i < this.numParticles; i++) {
      const p = this.particles[i];

      p.update();

      ctx.beginPath();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.arc(p.position.getX(), p.position.getY(), 2, 0, Math.PI * 2, false);
      ctx.globalAlpha = 1
      ctx.fill();
    }

    // shadow(this.color, 200);
    // fill(this.color);
    // ctx.globalAlpha = this.opacity;
    // circle(this.position, 60);
    // ctx.globalAlpha = 1
    ctx.restore();
  }
  getColor() {
    const r = Math.random() * 255;
    const g = Math.random() * 255;
    const b = Math.random() * 255;
    return `rgb(${r}, ${g}, ${b})`
  }
}
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
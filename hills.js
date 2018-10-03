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
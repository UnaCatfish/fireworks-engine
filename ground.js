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
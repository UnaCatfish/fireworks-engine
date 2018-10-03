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
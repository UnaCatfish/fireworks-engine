class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  sub(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }

  div(num) {
    this.x /= num;
    this.y /= num;
    return this;
  }

  mult(num) {
    this.x *= num;
    this.y *= num;
    return this;
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  magSq() {
    return this.x * this.x + this.y * this.y;
  }

  norm() {
    return this.div(this.mag())
  }

  limit(max) {
    if (this.magSq() > max * max) {
      this.setMag(max);
    }
    return this;
  }

  setMag(num) {
    this.div(this.mag())
    this.mult(num);
  }

}
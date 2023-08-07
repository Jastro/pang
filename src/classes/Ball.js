export default class Ball {
    constructor(x, y, radius, speed, direction, color = 'blue') {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.direction = direction;
        this.color = color;
    }

    update(canvas) {
        this.x += this.speed * Math.cos(this.direction);
        this.y += this.speed * Math.sin(this.direction);

        if (this.x < this.radius || this.x > canvas.width - this.radius) {
            this.direction = Math.PI - this.direction;
        }

        if (this.y > canvas.height - this.radius || this.y < this.radius) {
            this.direction = -this.direction;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

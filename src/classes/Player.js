import Bullet from "./Bullet.js";

export default class Player {
    constructor(x, y, width) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.isShooting = false;
        this.bullet = null;
    }

    shoot() {
        if (!this.isShooting) {
            this.bullet = new Bullet(this.x + this.width / 2, this.y - 10, -5);
            this.isShooting = true;
        }
    }

    move(direction, canvas) {
        const newX = this.x + direction;
        if (newX >= 0 && newX + this.width <= canvas.width) {
            this.x = newX;
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, 10);

        if (this.isShooting) {
            this.bullet.update(this);
            this.bullet.draw(ctx);
        }
    }
}

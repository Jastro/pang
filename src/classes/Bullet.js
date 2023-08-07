export default class Bullet {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    update(player) {
        this.y += this.speed;

        if (this.y < 0) {
            player.isShooting = false;
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, 5, 10);
    }
}

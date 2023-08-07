import Ball from './classes/Ball.js';
import Player from './classes/Player.js';

import { detectPlayerCollision, detectCollision, randomDirection, detectBallCollision } from './helpers.js';

const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

const player = new Player(canvas.width / 2 - 25, canvas.height - 20, 50);
const balls = [new Ball(canvas.width / 2, canvas.height / 2, 40, 3, Math.PI / 4)];

const ballProperties = {
    40: { color: 'green', smallerSize: 30 },
    30: { color: 'purple', smallerSize: 20 },
    20: { color: 'orange', smallerSize: 10 },
    10: { color: 'red' }
};

let moveLeft = false;
let moveRight = false;
const PLAYER_SPEED = 5;

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            moveLeft = true;
            break;
        case 'ArrowRight':
            moveRight = true;
            break;
        case ' ':
            player.shoot();
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            moveLeft = false;
            break;
        case 'ArrowRight':
            moveRight = false;
            break;
    }
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (moveLeft) player.move(-PLAYER_SPEED, canvas);
    if (moveRight) player.move(PLAYER_SPEED, canvas);

    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        ball.update(canvas);
        ball.draw(ctx);

        for (let i = 0; i < balls.length; i++) {
            const ballA = balls[i];
            for (let j = i + 1; j < balls.length; j++) {
                const ballB = balls[j];

                if (detectBallCollision(ballA, ballB)) {
                    const angle = Math.atan2(ballB.y - ballA.y, ballB.x - ballA.x);

                    ballA.direction = angle + Math.PI;
                    ballB.direction = angle;
                }
            }
        }

        if (detectPlayerCollision(player, ball)) {
            balls.splice(0, balls.length);
            balls.push(new Ball(canvas.width / 2, canvas.height / 2, 40, 3, Math.PI / 4));
            player.x = canvas.width / 2 - 25;
            return;
        }

        if (player.isShooting && detectCollision(ball, player.bullet)) {
            const properties = ballProperties[ball.radius];
            if (properties && properties.smallerSize) {
                const ball1 = new Ball(ball.x - ball.radius / 2, ball.y, properties.smallerSize, 3, randomDirection(), properties.color);
                const ball2 = new Ball(ball.x + ball.radius / 2, ball.y, properties.smallerSize, 3, randomDirection(), properties.color);

                balls.push(ball1);
                balls.push(ball2);
            }

            balls.splice(i, 1);
            i--;
            player.isShooting = false;
        }
    }

    player.draw(ctx);
    requestAnimationFrame(gameLoop);
}

gameLoop();

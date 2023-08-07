export function detectPlayerCollision(player, ball) {
    const playerTop = player.y;
    const playerBottom = player.y + 10;
    const playerLeft = player.x;
    const playerRight = player.x + player.width;

    const ballTop = ball.y - ball.radius;
    const ballBottom = ball.y + ball.radius;
    const ballLeft = ball.x - ball.radius;
    const ballRight = ball.x + ball.radius;

    return (ballRight > playerLeft && ballLeft < playerRight) &&
        (ballBottom > playerTop && ballTop < playerBottom);
}

export function detectCollision(ball, bullet) {
    const dist = Math.sqrt((ball.x - bullet.x) ** 2 + (ball.y - bullet.y) ** 2);
    return dist < ball.radius;
}

export function randomDirection() {
    const angles = [Math.PI / 4, 3 * Math.PI / 4, 5 * Math.PI / 4];
    return angles[Math.floor(Math.random() * angles.length)];
}

export function detectBallCollision(ball1, ball2) {
    const dist = Math.sqrt((ball1.x - ball2.x) ** 2 + (ball1.y - ball2.y) ** 2);
    return dist < (ball1.radius + ball2.radius);
}
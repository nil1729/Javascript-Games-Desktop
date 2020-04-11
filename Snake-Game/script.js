const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');

// create the unit
const box = 32;

// Direction 
let d;

// load Audios

const dead = new Audio();
const down = new Audio();
const eat = new Audio();
const left = new Audio();
const right = new Audio();
const up = new Audio();

dead.src = 'audio/dead.mp3';
down.src = 'audio/down.mp3';
eat.src = 'audio/eat.mp3';
left.src = 'audio/left.mp3';
right.src = 'audio/right.mp3';
up.src = 'audio/up.mp3';

// load Images

const ground = new Image();
ground.src = 'img/ground.png';

const foodImg = new Image();
foodImg.src = 'img/food.png';

// create the snake

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

// Create the food

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// create the Score Variable
let score = 0;

// draw everything to our canvas

function draw() {
    ctx.drawImage(ground, 0, 0);
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? 'green' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.fillStyle = 'red';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.drawImage(foodImg, food.x, food.y);

    // old Head Position

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    // Collision Function
    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x == array[i].x && head.y == array[i].y) {
                return true;
            }
        }
        return false;
    }

    // which direction
    if (d == 'LEFT') snakeX -= box;
    if (d == 'UP') snakeY -= box;
    if (d == 'DOWN') snakeY += box;
    if (d == 'RIGHT') snakeX += box;

    //  if the snake eats the food;
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
        eat.play();
    } else {
        // remove the tail
        snake.pop();
    }
    let newHead = {
            x: snakeX,
            y: snakeY
        }
        // Game Over 

    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
        dead.play();
        clearInterval(game);
    }




    snake.unshift(newHead);

    ctx.fillStyle = 'white';
    ctx.font = '45px Changa one';
    ctx.fillText(score, 2 * box, 1.6 * box);
}

// Call Draw function Every 100ms

let game = setInterval(draw, 100);




// control the Snake

document.addEventListener('keydown', direction);

function direction(event) {
    if (event.keyCode == 37 && d != 'RIGHT') {
        d = 'LEFT';
        left.play();
    } else if (event.keyCode == 38 && d != 'DOWN') {
        d = 'UP';
        up.play();
    } else if (event.keyCode == 39 && d != 'LEFT') {
        d = 'RIGHT';
        right.play();
    } else if (event.keyCode == 40 && d != 'UP') {
        d = 'DOWN';
        down.play();
    }
}
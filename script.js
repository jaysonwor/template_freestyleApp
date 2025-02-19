// Game variables and constants
const gameAreaWidth = 800;
const gameAreaHeight = 600;
let snake = [];
let snakeDirection = 'RIGHT';
let score = 0;
let level = 1;
let food = {};
let obstacles = [];
let players = {};
let playerCount = 0;

// Initialize the game
function initGame() {
    snake = [{ x: 10, y: 10 }];
    snakeDirection = 'RIGHT';
    score = 0;
    obstacles = [];
    createFood();
    createObstacles();
    renderGame();
}

// Handle user input for controlling the snake
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
            if (snakeDirection !== 'DOWN') snakeDirection = 'UP';
            break;
        case 'ArrowDown':
            if (snakeDirection !== 'UP') snakeDirection = 'DOWN';
            break;
        case 'ArrowLeft':
            if (snakeDirection !== 'RIGHT') snakeDirection = 'LEFT';
            break;
        case 'ArrowRight':
            if (snakeDirection !== 'LEFT') snakeDirection = 'RIGHT';
            break;
    }
});

// Game loop function
setInterval(function() {
    updateSnakePosition();
    checkCollisions();
    renderGame();
}, 100);

// Collision detection function
function checkCollisions() {
    // Check for wall collisions
    if (snake[0].x < 0 || snake[0].x >= gameAreaWidth || snake[0].y < 0 || snake[0].y >= gameAreaHeight) {
        updateScore(-20);
        initGame();
    }

    // Check for collisions with obstacles
    for (let obstacle of obstacles) {
        if (snake[0].x === obstacle.x && snake[0].y === obstacle.y) {
            updateScore(-20);
            initGame();
        }
    }

    // Check for food collection
    if (snake[0].x === food.x && snake[0].y === food.y) {
        updateScore(10);
        snake.push({}); // Grow the snake
        createFood();
    }

    // Move the snake
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i] = { ...snake[i - 1] };
    }
    switch (snakeDirection) {
        case 'UP':
            snake[0].y -= 10;
            break;
        case 'DOWN':
            snake[0].y += 10;
            break;
        case 'LEFT':
            snake[0].x -= 10;
            break;
        case 'RIGHT':
            snake[0].x += 10;
            break;
    }
}

// Function to generate food items
function createFood() {
    food.x = Math.floor(Math.random() * (gameAreaWidth / 10)) * 10;
    food.y = Math.floor(Math.random() * (gameAreaHeight / 10)) * 10;
}

// Function to create obstacles based on the level
function createObstacles() {
    obstacles = [];
    if (level === 1) {
        obstacles.push({ x: 200, y: 200 });
    } else if (level === 2) {
        obstacles.push({ x: 300, y: 300 });
        obstacles.push({ x: 400, y: 400 });
    } else if (level === 3) {
        obstacles.push({ x: 100, y: 100 });
        obstacles.push({ x: 200, y: 300 });
        obstacles.push({ x: 300, y: 500 });
    } else if (level === 4) {
        for (let i = 0; i < 5; i++) {
            obstacles.push({ x: Math.floor(Math.random() * (gameAreaWidth / 10)) * 10, y: Math.floor(Math.random() * (gameAreaHeight / 10)) * 10 });
        }
    } else if (level === 5) {
        for (let i = 0; i < 10; i++) {
            obstacles.push({ x: Math.floor(Math.random() * (gameAreaWidth / 10)) * 10, y: Math.floor(Math.random() * (gameAreaHeight / 10)) * 10 });
        }
    }
}

// Scoring system implementation
function updateScore(points) {
    score += points;
    document.getElementById('scoreDisplay').innerText = `Score: ${score}`;
}

// Level progression logic
function checkLevelCompletion() {
    if (score >= 50) {
        level++;
        if (level > 5) level = 5; // Cap at level 5
        updateScore(50); // Bonus for completing the level
        initGame(); // Restart the game for the new level
    }
}

// Rendering function
function renderGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, gameAreaWidth, gameAreaHeight);

    // Draw the snake
    ctx.fillStyle = 'green';
    for (let segment of snake) {
        ctx.fillRect(segment.x, segment.y, 10, 10);
    }

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);

    // Draw obstacles
    ctx.fillStyle = 'blue';
    for (let obstacle of obstacles) {
        ctx.fillRect(obstacle.x, obstacle.y, 10, 10);
    }

    checkLevelCompletion();
}

// Chat feature implementation
document.getElementById('sendChat').addEventListener('click', function() {
    const message = document.getElementById('chatInput').value;
    if (message) {
        sendMessage(message);
        document.getElementById('chatInput').value = '';
    }
});

function sendMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML += `<div>${message}</div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the bottom
}

// Initialize the game on page load
window.onload = initGame;

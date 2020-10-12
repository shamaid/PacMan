// consts
const pac_down = [0.65, 2.35, 5, -15]
const pac_up = [1.65, 3.35, -5, 15]
const pac_left = [1.15, 2.85, -5, -15]
const pac_right = [0.15, 1.85, 5, -15]
const BLANK = 0;
const PACMAN = 2;
const FIVE_POINT = 5;
const TEN_POINT = 10;
const FIFTEEN_POINT = 15;
const TWENTYFIVE_POINT = 25;
const MOVING_FOOD = 50;
const WALL = 4;
const MONSTER = 7;
const canvas_width = 12;
const canvas_height = 12;
const PLUS = 1;
const TIME = 3;



// Const
const UP_DIRECTION = 1;
const DOWN_DIRECTION = 2;
const LEFT_DIRECTION = 3;
const RIGHT_DIRECTION = 4;


var context
var shape = new Object();
var board;
var score = 0;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var pac_direction = pac_right;
var init_start = true; //new game init
var interval_counter = 0;
var set_plus; //init plus food
var set_time;//init time food
var set_moving_food;//init moving food

var lives = 5;
var winGame = false;
var audio;
var loseToMonsters = false;

var game_food = 90;

var monsters_number = 4;

var game_time = 10;

//Monsters
let monsters = new Array();
let moving_food;

//settings
var gameMoveKeys = [];
var ballsNumber = 50;
var ballsColor = ["#55aecc", "#d275d5", "#43e45b"];
var gameTimer = 60;
var monstersNumber = 1;
var pacmanSong;

function resetGame() {
    window.clearInterval(interval);
    interval_counter = 0;
    lives = 5;
    game_food = ballsNumber;
    game_time = gameTimer;
    start_time = new Date();
    score = 0;
    init_start = true;
    monsters = new Array();
    context = canvas.getContext("2d");
    monsters_number = monstersNumber;


    $("#pacmanSong").get(0).pause();
    document.getElementById("pacmanSong").muted = true;
    $("#pacmanDeathSong").get(0).pause();
    document.getElementById("pacmanDeathSong").muted = true;
    $("#applauseSong").get(0).pause();
    document.getElementById("applauseSong").muted = true;
    $("#loseSong").get(0).pause();
    document.getElementById("loseSong").muted = true;
}

function restartGame() {
    // $("#myModal").modal('hide');
    $.modal.close();
    startNewGame();
}


function startNewGame() {
    // $("#myModal").modal('hide');
    resetGame();
    Start();
    playAudio();
}

function playAudio() {
    audio = $("#pacmanSong").get(0);
    if (audio.paused) {
        audio.play();
    }


}

function gameBoard() {
    $('#mainWindow').children().hide();
    $('#logo').show();
    $('#nav').show();
    setSettingsBoard();
    $('#gameUser').text("Welcome " + username + " !");
    $('#gamePage').show()
    $('#footer').show()
}

function setSettingsBoard() {
    lblScore.value = score;
    lblTime.value = Math.floor(game_time - time_elapsed);
    lblLive.value = lives;
    ballsNumber_settingsBoard.value = ballsNumber;
    gameTimer_settingsBoard.value = gameTimer;
    monstersNumber_settingsBoard.value = monstersNumber;
    up_settingsBoard.value = $("#up")[0].value;
    down_settingsBoard.value = $("#down")[0].value;
    right_settingsBoard.value = $("#right")[0].value;
    left_settingsBoard.value = $("#left")[0].value;
    Ball_5Point_settingsBoard.value = ballsColor[0];
    Ball_15Point_settingsBoard.value = ballsColor[1];
    Ball_25Point_settingsBoard.value = ballsColor[2];
}

window.addEventListener("keydown", function (e) {
    if ([gameMoveKeys[0], gameMoveKeys[1], gameMoveKeys[3], gameMoveKeys[2]].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

$(document).ready(function () {
    context = canvas.getContext("2d");
    //Start();

});

// intialize the board 
function Start() {
    console.log(gameMoveKeys[0] + "," + gameMoveKeys[1] + "," + gameMoveKeys[2] + "," + gameMoveKeys[3])
    gameBoard();
    document.getElementById("pacmanSong").muted = false;
    board = new Array();
    pac_color = "yellow";
    var cnt = 100;
    let five_point_remain = Math.round(game_food * 0.60)
    let fifteen_point_remain = Math.round(game_food * 0.30)
    let twnteeyfive_point_remain = Math.round(game_food * 0.15)
    set_plus = true;
    set_time = true;
    setBoard(board);
    setMovingFood();
    setPlusLive();
    setTimeAdder();
    setFood(board, five_point_remain, fifteen_point_remain, twnteeyfive_point_remain);
    if (init_start == true) {
        start_time = new Date();
        setMonsters();
        keysDown = {};
        addEventListener(
            "keydown",
            function (e) {
                keysDown[e.keyCode] = true;
            },
            false
        );
        addEventListener(
            "keyup",
            function (e) {
                keysDown[e.keyCode] = false;
            },
            false
        );
        init_start = false;
    }
    else {
        resetMonsters();
    }
    interval = setInterval(UpdatePosition, 200);

}


function setBoard(board) {
    for (var i = 0; i < 12; i++) {
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < 12; j++) {
            if (//Walls
                (i == 2 && j == 1) ||
                (i == 2 && j == 2) ||
                (i == 1 && j == 2) ||
                (i == 1 && j == 5) ||
                (i == 1 && j == 6) ||
                (i == 1 && j == 9) ||
                (i == 2 && j == 9) ||
                (i == 2 && j == 10) ||

                (i == 4 && j == 4) ||
                (i == 4 && j == 7) ||
                (i == 7 && j == 4) ||
                (i == 7 && j == 7) ||

                (i == 6 && j == 1) ||
                (i == 5 && j == 1) ||
                (i == 6 && j == 10) ||
                (i == 5 && j == 10) ||

                (i == 9 && j == 1) ||
                (i == 9 && j == 2) ||
                (i == 10 && j == 2) ||
                (i == 10 && j == 5) ||
                (i == 10 && j == 6) ||
                (i == 10 && j == 9) ||
                (i == 9 && j == 9) ||
                (i == 9 && j == 10)

            ) {
                board[i][j] = WALL;
            }
            else if (//Monsters
                (i == 0 && j == 0) ||
                (i == 11 && j == 11) ||
                (i == 11 && j == 0) ||
                (i == 0 && j == 11)

            ) {
                continue;
            }
            else if (i == 4 && j == 5 && init_start == true) {
                shape.i = i;
                shape.j = j;
                board[i][j] = PACMAN;
            }
            else {
                board[i][j] = BLANK;
            }
        }

    }
}



function setPlusLive() {
    let emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = PLUS;
}

function setTimeAdder() {
    let emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = TIME;
}

function setFood(board, five_point_remain, fifteen_point_remain, twnteeyfive_point_remain) {
    while (five_point_remain > 0) {
        let emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = FIVE_POINT;
        five_point_remain--;

    }
    while (fifteen_point_remain > 0) {
        let emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = FIFTEEN_POINT;
        fifteen_point_remain--;

    }
    while (twnteeyfive_point_remain > 0) {
        let emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = TWENTYFIVE_POINT;
        twnteeyfive_point_remain--;
    }
}

function findRandomEmptyCell(board) {
    var i = Math.floor(Math.random() * 12);
    var j = Math.floor(Math.random() * 12);
    while (board[i][j] != BLANK) {
        i = Math.floor(Math.random() * 12);
        j = Math.floor(Math.random() * 12);
    }
    return [i, j];
}

function GetKeyPressed() {
    if (keysDown[gameMoveKeys[0]]) { //up
        pac_direction = pac_up
        return 1;
    }
    if (keysDown[gameMoveKeys[1]]) { //down
        pac_direction = pac_down
        return 2;
    }
    if (keysDown[gameMoveKeys[3]]) { //left
        pac_direction = pac_left
        return 3;
    }
    if (keysDown[gameMoveKeys[2]]) { //right
        pac_direction = pac_right
        return 4;
    }
}

function Draw() {
    canvas.width = canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = Math.floor(game_time - time_elapsed);
    lblLive.value = lives;
    for (var i = 0; i < 12; i++) {
        for (var j = 0; j < 12; j++) {
            var center = new Object();
            center.x = i * 50 + 25;
            center.y = j * 50 + 25;
            if (board[i][j] == PACMAN) {
                context.beginPath();
                context.arc(center.x, center.y, 20, pac_direction[0] * Math.PI, pac_direction[1] * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + pac_direction[2], center.y + pac_direction[3], 3, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] == FIVE_POINT) {
                context.beginPath();
                context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = ballsColor[0]; //color
                context.fill();
            } else if (board[i][j] == FIFTEEN_POINT) {
                context.beginPath();
                context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
                context.fillStyle = ballsColor[1]; //color
                context.fill();
            } else if (board[i][j] == TWENTYFIVE_POINT) {
                context.beginPath();
                context.arc(center.x, center.y, 13, 0, 2 * Math.PI); // circle
                context.fillStyle = ballsColor[2]; //color
                context.fill();
            } else if (board[i][j] == MOVING_FOOD) {
                var img = document.getElementById("cherry");
                context.drawImage(img, center.x - 20, center.y - 20, 50, 50);
            } else if (board[i][j] == WALL) {
                var img = document.getElementById("wall");
                context.drawImage(img, center.x - 20, center.y - 20, 50, 50);
            } else if (board[i][j] == MONSTER) {
                var img = document.getElementById("imgMonster");
                context.drawImage(img, center.x - 20, center.y - 20, 40, 40);
            } else if (board[i][j] == PLUS) {
                var img = document.getElementById("imgPlus");
                context.drawImage(img, center.x - 20, center.y - 20, 40, 40);
            } else if (board[i][j] == TIME) {
                var img = document.getElementById("imgTime");
                context.drawImage(img, center.x - 20, center.y - 20, 55, 55);
            }



        }
    }
}

function UpdatePosition() {
    interval_counter++;
    // caughtMonster();
    var x = GetKeyPressed();
    board[shape.i][shape.j] = BLANK;
    if (x == 1) {
        if (shape.j > 0 && board[shape.i][shape.j - 1] != WALL) {
            shape.j--;
        }
    }
    if (x == 2) {
        if (shape.j < 11 && board[shape.i][shape.j + 1] != WALL) {
            shape.j++;
        }
    }
    if (x == 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] != WALL) {
            shape.i--;
        }
    }
    if (x == 4) {
        if (shape.i < 11 && board[shape.i + 1][shape.j] != WALL) {
            shape.i++;
        }
    }
    if (board[shape.i][shape.j] == FIVE_POINT) {
        score += 5;
    }
    if (board[shape.i][shape.j] == FIFTEEN_POINT) {
        score += 15;
    }
    if (board[shape.i][shape.j] == TWENTYFIVE_POINT) {
        score += 25;
    }
    if (set_moving_food && board[shape.i][shape.j] == MOVING_FOOD) {
        caughtFood();
    }
    if (interval_counter % 2 === 0) {
        monsters.forEach(monster => moveMonster(monster));
    }
    if (interval_counter % 2 == 0 && set_moving_food) {
        moveMovingFood();
    }
    if (set_plus && board[shape.i][shape.j] == PLUS) {
        caughtPlus();
    }
    if (set_time && board[shape.i][shape.j] == TIME) {
        caughtTime();
    }

    caughtMonster();

    board[shape.i][shape.j] = PACMAN;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    if (time_elapsed >= game_time) {
        if (score >= 100) {
            pac_color = "green";
            winGame = true;
        } else {
            pac_color = "red";
        }
        game_over = true;
        Draw();
        gameOver();

    } else {
        Draw();
    }
}

function caughtFood() {
    set_moving_food = false;
    score = score + 50;
}
function caughtPlus() {
    set_plus = false;
    lives = lives + 1;
}

function caughtTime() {
    set_time = false;
    //game_time += 10;
    game_time = parseInt(game_time) + parseInt(10);

}
function gameOver() {
    document.getElementById("pacmanSong").muted = true;
    resetGame();

    //show button
    $('#mainWindow').children().hide();
    $('#logo').show();
    $('#nav').show();
    $('#footer').show();
    if (winGame) {
        $("#modal_win").modal('show');
        $('.scoreUser').text("You'r score " + lblScore.value + " !");
        $("#applauseSong").get(0).play();
        document.getElementById("applauseSong").muted = false;

        //Lose by lives
    } else if (loseToMonsters) {
        $("#modal_loseGhosts").modal('show');
        $('.scoreUser').text("You'r score " + lblScore.value);
        $("#pacmanDeathSong").get(0).play();
        document.getElementById("pacmanDeathSong").muted=false;

        // lose by time
    } else {
        $("#modal_loseScore").modal('show');
        $('.scoreUser').text("You'r score " + lblScore.value);
        $('#loseScoreLabel').text("You are better than " + lblScore.value + " points!");
        $("#pacmanDeathSong").get(0).play();
        document.getElementById("pacmanDeathSong").muted=false;

    }
    winGame = false;
    loseToMonsters = false;

}


function arrayShuffle(array) {
    for (let i = 0; i < array.length; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Monster object 
function Monster(x, y) {
    this.x = x;
    this.y = y;
    this.last;
}


function setMonsters() {
    let num_monsters = monsters_number;
    let monster;
    board[0][0] = MONSTER;
    monster = new Monster(0, 0);
    monsters.push(monster);
    if (num_monsters > 1) {
        board[0][canvas_height - 1] = MONSTER;
        monster = new Monster(0, canvas_height - 1, null);
        monsters.push(monster)
        if (num_monsters > 2) {
            board[canvas_width - 1][0] = MONSTER;
            monster = new Monster(canvas_width - 1, 0, null);
            monsters.push(monster)
        }
        if (num_monsters > 3) {
            board[canvas_width - 1][canvas_height - 1] = MONSTER;
            monster = new Monster(canvas_width - 1, canvas_height - 1, null);
            monsters.push(monster)
        }
    }
}

function resetMonsters() {
    let monsterPlace = [1, 2, 3, 4];
    monsterPlace = arrayShuffle(monsterPlace);
    monsters.forEach(function (monster) {
        board[monster.x][monster.y] = 0;
        let number = monsterPlace.pop();
        if (number === 1) {
            board[0][0] = MONSTER;
            monster.x = 0;
            monster.y = 0;
        } else if (number === 2) {
            board[0][canvas_height - 1] = MONSTER;
            monster.x = 0;
            monster.y = canvas_height - 1;
        } else if (number === 3) {
            board[canvas_width - 1][0] = MONSTER;
            monster.x = canvas_width - 1;
            monster.y = 0;
        } else {
            board[canvas_width - 1][canvas_height - 1] = MONSTER;
            monster.x = canvas_width - 1;
            monster.y = canvas_height - 1;
        }
    })
}


function caughtMonster() {
    if (board[shape.i][shape.j] === MONSTER) {
        score -= 10;
        lives--;
        if (lives === 0) {
            pac_color = "red";
            loseToMonsters = true;
            gameOver();
        } else {
            window.clearInterval(interval);
            Start();
            var emptyCell = findRandomEmptyCell(board);
            shape.i = emptyCell[0];
            shape.j = emptyCell[1];
        }
        // $("#pacmanDeathSong").get(0).play();
        // document.getElementById("pacmanDeathSong").muted = false;
        $("#loseSong").get(0).play();
        document.getElementById("loseSong").muted = false;
    }

}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((Math.pow(x1 - x2, 2)) + Math.pow(y1 - y2, 2));
}

// monster movment
function moveMonster(monster) {
    let maxDistance = Infinity;
    let distance;
    let direction = false;
    //Up
    if (monster.y > 0 && board[monster.x][monster.y - 1] != WALL
        && board[monster.x][monster.y - 1] != MONSTER && board[monster.x][monster.y - 1] != MOVING_FOOD) {
        distance = getDistance(monster.x, monster.y - 1, shape.i, shape.j);
        if (distance < maxDistance) {
            direction = UP_DIRECTION;
            maxDistance = distance;
        }
    }
    //Down
    if (monster.y < (canvas_height - 1) && board[monster.x][monster.y + 1] != WALL
        && board[monster.x][monster.y + 1] != MONSTER && board[monster.x][monster.y + 1] != MOVING_FOOD) {
        distance = getDistance(monster.x, monster.y + 1, shape.i, shape.j);
        if (distance < maxDistance) {
            direction = DOWN_DIRECTION;
            maxDistance = distance;
        }
    }

    if (monster.x < (canvas_width - 1) && board[monster.x + 1][monster.y] != WALL
        && board[monster.x + 1][monster.y] != MONSTER && board[monster.x + 1][monster.y] != MOVING_FOOD) {
        distance = getDistance(monster.x + 1, monster.y, shape.i, shape.j);
        if (distance < maxDistance) {
            direction = RIGHT_DIRECTION;
            maxDistance = distance;
        }
    }
    //Left
    if (monster.x > 0 && board[monster.x - 1][monster.y] != WALL
        && board[monster.x - 1][monster.y] != MONSTER && board[monster.x - 1][monster.y] != MOVING_FOOD) {
        distance = getDistance(monster.x - 1, monster.y, shape.i, shape.j);
        if (distance < maxDistance) {
            direction = LEFT_DIRECTION;
            maxDistance = distance;
        }
    }

    if (monster.food_place !== null) {
        board[monster.x][monster.y] = monster.food_place;
    }

    //Move
    if (direction === UP_DIRECTION) {
        monster.y -= 1;
    } else if (direction === DOWN_DIRECTION) {
        monster.y += 1;
    } else if (direction === LEFT_DIRECTION) {
        monster.x -= 1;
    } else if (direction === RIGHT_DIRECTION) {
        monster.x += 1;
    }

    if (board[monster.x][monster.y] == FIVE_POINT
        || board[monster.x][monster.y] == FIFTEEN_POINT
        || board[monster.x][monster.y] == TWENTYFIVE_POINT
        || board[monster.x][monster.y] == PLUS
        || board[monster.x][monster.y] == TIME
        || board[monster.x][monster.y] == MOVING_FOOD) {
        monster.food_place = board[monster.x][monster.y];
    }
    else {
        monster.food_place = BLANK;
    }
    board[monster.x][monster.y] = MONSTER;
}

function MovingFood(x, y) {
    this.x = x;
    this.y = y;
    this.last;
}

function setMovingFood() {
    set_moving_food = true;
    let emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = MOVING_FOOD;
    moving_food = new MovingFood(emptyCell[0], emptyCell[1]);
}

function moveMovingFood() {
    let minDistance = 0;
    let distance;
    let direction = false;

    //Up
    if (moving_food.y > 0 && board[moving_food.x][moving_food.y - 1] != WALL
        && board[moving_food.x][moving_food.y - 1] != MONSTER && board[moving_food.x][moving_food.y - 1] != PACMAN) {
        distance = getDistance(moving_food.x, moving_food.y - 1, shape.i, shape.j);
        if (distance > minDistance) {
            direction = UP_DIRECTION;
            minDistance = distance;
        }

    }
    //Down
    if (moving_food.y < (canvas_height - 1) && board[moving_food.x][moving_food.y + 1] != WALL
        && board[moving_food.x][moving_food.y + 1] != MONSTER && board[moving_food.x][moving_food.y + 1] != PACMAN) {
        distance = getDistance(moving_food.x, moving_food.y + 1, shape.i, shape.j);
        if (distance > minDistance) {
            direction = DOWN_DIRECTION;
            minDistance = distance;
        }

    }

    // right
    if (moving_food.x < (canvas_width - 1) && board[moving_food.x + 1][moving_food.y] != WALL
        && board[moving_food.x + 1][moving_food.y] != MONSTER && board[moving_food.x + 1][moving_food.y] != PACMAN) {
        distance = getDistance(moving_food.x + 1, moving_food.y, shape.i, shape.j);
        if (distance > minDistance) {
            direction = RIGHT_DIRECTION;
            minDistance = distance;
        }
    }

    //Left
    if (moving_food.x > 0 && board[moving_food.x - 1][moving_food.y] != WALL
        && board[moving_food.x - 1][moving_food.y] != MONSTER && board[moving_food.x - 1][moving_food.y] != PACMAN) {
        distance = getDistance(moving_food.x - 1, moving_food.y, shape.i, shape.j);
        if (distance > minDistance) {
            direction = LEFT_DIRECTION;
            minDistance = distance;
        }


    }

    if (moving_food.food_place !== null) {
        board[moving_food.x][moving_food.y] = moving_food.food_place;
    }
    //Move
    if (direction === UP_DIRECTION) {
        moving_food.y -= 1;
    } else if (direction === DOWN_DIRECTION) {
        moving_food.y += 1;
    } else if (direction === LEFT_DIRECTION) {
        moving_food.x -= 1;
    } else if (direction === RIGHT_DIRECTION) {
        moving_food.x += 1;
    }

    if (board[moving_food.x][moving_food.y] == FIVE_POINT
        || board[moving_food.x][moving_food.y] == FIFTEEN_POINT
        || board[moving_food.x][moving_food.y] == TWENTYFIVE_POINT
        || board[moving_food.x][moving_food.y] == PLUS
        || board[moving_food.x][moving_food.y] == TIME) {
        moving_food.food_place = board[moving_food.x][moving_food.y];
    }
    else {
        moving_food.food_place = BLANK;
    }
    board[moving_food.x][moving_food.y] = MOVING_FOOD;
}


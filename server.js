var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get("/", function (req, res) {
res.redirect("index.html");
});

server.listen(3000, function () {
console.log("Example is running on port 3000");
});

var Grass = require('./grass')
var GrassEater = require('./grassEater')
var bomb = require('./bomb')
var Predator = require('./predator')
var Lie = require('./Something')
var Bomb = require('./bomb')
let random = require("./random");

matrix = [];
grasses = [];
grassEaterArr = [];
Something = [];
PredatorArr = [];
BombArr = [];
weather = ["Garun","Amar","Ashun","Dzmer"]


function matrixGenerator(matrixSize, grassCount, grassEaterCount, somethingCount, predatorCount) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = []
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grassCount; i++) {
        let x = Math.floor(random(matrixSize));
        let y = Math.floor(random(matrixSize));
        matrix[y][x] = 1;
    }
    for (let i = 0; i < grassEaterCount; i++) {
        let x = Math.floor(random(matrixSize));
        let y = Math.floor(random(matrixSize));
        matrix[y][x] = 2;
    }
    for (let i = 0; i < somethingCount; i++) {
        let x = Math.floor(random(matrixSize));
        let y = Math.floor(random(matrixSize));
        matrix[y][x] = 3;
    }
    for (let i = 0; i < predatorCount; i++) {
        let x = Math.floor(random(matrixSize));
        let y = Math.floor(random(matrixSize));
        matrix[y][x] = 5;
    }
}
matrixGenerator(30, 5, 5, 5, 5);

for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            let grassObject = new Grass(x, y);
            grasses.push(grassObject)
        }
        else if (matrix[y][x] == 2) {
            let grassEaterObject = new GrassEater(x, y);
            grassEaterArr.push(grassEaterObject)
        }
        else if (matrix[y][x] == 3) {
            let newSomething = new Lie(x, y);
            Something.push(newSomething)
        }
        else if (matrix[y][x] == 5) {
            let newPredator = new Predator(x, y);
            PredatorArr.push(newPredator)
        }
    }
}

var bomb = new Bomb(matrix.length + 1, matrix.length + 1)
BombArr.push(bomb)

count = 0
function playGame() {
    for (let i in grasses) {
        grasses[i].mul();
    }
    for (let i in BombArr) {
        BombArr[i].fall();
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (let i in Something) {
        Something[i].move();
    }
    for (let i in PredatorArr) {
        PredatorArr[i].eat();
    }
    io.emit("Matrix",matrix)

}
count = 0


function changeWeather () {
    p.innerText = weather[count]
    count++
}

setInterval(playGame,250);

setInterval(changeWeather,1000);
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

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
var Rabbit = require('./rabbit')
var Panther = require('./panther')
var Bomb = require('./bomb')
let random = require("./random");

matrix = [];
snowManArr = [];
grasses = [];
grassEaterArr = [];
Something = [];
PredatorArr = [];
BombArr = [];
pantherArr = [];
rabbitArr = []


gen = ["male", "female"]
weather = ["Garun", "Amar", "Ashun", "Dzmer"]

grassStat = 0
grassEatersStat = 0
PredatorsStat = 0
SomethingStat = 0
RabbitStat = 0
pantherStat = 0

matrixGenerator(25, 10, 0, 15, 0, 0, 8);

io.on('connection', function (socket) {
    socket.on("send message", function (val) {
        val = "ok"
        BombArr[0].fall();
    });
});

setInterval(changeWeather, 8000);
setInterval(playGame, 1000);




function matrixGenerator(matrixSize, grassCount, grassEaterCount, somethingCount, predatorCount,rabbitCount,pantherCount) {
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
    for (let i = 0; i < rabbitCount; i++) {
        let x = Math.floor(random(matrixSize));
        let y = Math.floor(random(matrixSize));
        matrix[y][x] = 11;
    }
    for (let i = 0; i < pantherCount; i++) {
        let x = Math.floor(random(matrixSize));
        let y = Math.floor(random(matrixSize));
        matrix[y][x] = 12;
    }
}

for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            let grassObject = new Grass(x, y);
            grasses.push(grassObject)
            grassStat++
        }
        else if (matrix[y][x] == 2) {
            let grassEaterObject = new GrassEater(x, y);
            grassEaterArr.push(grassEaterObject)
            grassEatersStat++
        }
        else if (matrix[y][x] == 3) {
            let newSomething = new Lie(x, y);
            Something.push(newSomething)
            SomethingStat++
        }
        else if (matrix[y][x] == 5) {
            let newPredator = new Predator(x, y);
            PredatorArr.push(newPredator)
            PredatorsStat++
        }
        else if (matrix[y][x] == 11) {
            let newRabbit = new Rabbit(x, y);
            rabbitArr.push(newRabbit)
            RabbitStat++

        }
        else if (matrix[y][x] == 12) {
            let newPanther = new Panther(x, y);
            pantherArr.push(newPanther)
            pantherStat++

        }
    }
}

var bomb = new Bomb(matrix.length + 1, matrix.length + 1)
BombArr.push(bomb)

function playGame() {
    main();
    io.emit("Stats", grassStat,grassEatersStat,PredatorsStat,SomethingStat,RabbitStat,pantherStat)
    io.emit("Matrix", matrix)
    for (let i in grasses) {
        grasses[i].mul();
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (let i in rabbitArr) {
        rabbitArr[i].eat();
    }
    for (let i in Something) {
        Something[i].move();
    }
    for (let i in PredatorArr) {
        PredatorArr[i].eat();
    } 
    for (let i in pantherArr) {
        pantherArr[i].eat();
    } 
}
count = 0

Str = weather[count]

function changeWeather() {
    str = weather[count]
    count++
    if (count == 4) {
        count = 0
    }
    io.emit("WEATHER", str)
    GlobalString(str)   
}

function GlobalString(s) {
    Str = s
}

function main() {
    fs.writeFileSync("presentStat.json", JSON.stringify({ 
        grassCount: grassStat,
        grassEatersCount: grassEatersStat,
        PredatorsCount: PredatorsStat,
        SomethingCount: SomethingStat,
        RabbitCount: RabbitStat,
        PantherCount: pantherStat }));
}

function GlobalString(s) {
    Str = s
}
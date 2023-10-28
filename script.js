var socket = io()
side = 30
m = 40
n = 40

var pB = document.getElementById("bomb");
var p = document.getElementById("W");
var pG = document.getElementById("Grass");
var pP = document.getElementById("Predator");
var pGE = document.getElementById("GrassEater");
var pS = document.getElementById("Something");
function setup() {
    frameRate(30);
    createCanvas(n * side, m * side)
    background('#acacac');
}

socket.on("Matrix", (m) =>{
    draw(m);
})

val = true

function bodyClick(){
    socket.emit("send message", val);
}

pB.addEventListener("click", bodyClick);

socket.on("WEATHER", (str) =>{
    p.innerText = str
})



socket.on("Stats", (grassStat,grassEatersStat,PredatorsStat,SomethingStat) =>{
    pG.innerText = "Այս խաղի ընթացքում ծնվել է " + grassStat + " Grass"
    pGE.innerText = "Այս խաղի ընթացքում ծնվել է "+ grassEatersStat + " GrassEater"
    pP.innerText = "Այս խաղի ընթացքում ծնվել է "+ PredatorsStat + " Predator"
    pS.innerText = "Այս խաղի ընթացքում ծնվել է "+ SomethingStat + " Something"
})

function draw(m) {
    matrix = m
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if (p.innerText == "Dzmer") {
                  fill("white");
                  rect(x * side, y * side, side, side);
                }
                else if (p.innerText == "Ashun"){
                  fill("#bf9800");
                  rect(x * side, y * side, side, side);
                }
                else{
                    fill("green");
                    rect(x * side, y * side, side, side);
                }
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                if (p.innerText == "Dzmer") {
                    fill("#d4d4d4");
                    rect(x * side, y * side, side, side);
                }
                else if (p.innerText == "Ashun"){
                    fill("#8e7100");
                    rect(x * side, y * side, side, side);
                  }
                else{
                    fill("#00ab41");
                    rect(x * side, y * side, side, side);
                }
            }
            else if (matrix[y][x] == 5) {
                fill("orange");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 8) {
                fill("#000");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
        }
    }
}



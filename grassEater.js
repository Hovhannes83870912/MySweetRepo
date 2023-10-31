// Խոտակերը կարողանում է ուտել խոտ և բազմանալ
var LivingCreature = require("./LivingCreature")
let random = require("./random");
module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.gender = random(gen)
        if(this.gender == "male"){
            this.energy = 8
        }
        else{
            this.energy = 6
        }
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    ChooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    mul() {
        var emptyCells = this.ChooseCell(0);
        var newCell = random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var grass = new GrassEater(newX, newY);
            grassEaterArr.push(grass);
            this.gender = random(gen)
            if(this.gender == "male"){
                this.energy = 8
            }
            else{
                this.energy = 6
            }
            grassEatersStat++
        }
    }

    move() {
        this.energy--
        var emptyCells = this.ChooseCell(0);
        var newCell = random(emptyCells);
        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0;
            this.x = newX
            this.y = newY
        } else {
            this.die()
        }
    }

    eat() {
        var emptyCells = this.ChooseCell(1);
        var newCell = random(emptyCells);
        if (newCell) {
            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0;
            this.x = newX
            this.y = newY
            if(this.gender == "male"){
             if (this.energy > 32 && Str == "Dzmer") {
                this.mul()
             }
             if(this.energy > 12 && Str == "Amar"){
                this.mul()
             }
             if(this.energy > 18 && Str == "Garun"){
                this.mul()
             }
             if(this.energy > 24 && Str == "Ashun"){
                this.mul()
             }
            }
            else{
                if (this.energy > 38 && Str == "Dzmer") {
                   this.mul()
                }
                if(this.energy > 20 && Str == "Amar"){
                   this.mul()
                }
                if(this.energy > 24 && Str == "Garun"){
                   this.mul()
                }
                if(this.energy > 30 && Str == "Ashun"){
                   this.mul()
                }
            }
            for (var i in grasses) {
                if (newX == grasses[i].x && newY == grasses[i].y) {
                    grasses.splice(i, 1);
                    break;
                }
            }

        } else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}
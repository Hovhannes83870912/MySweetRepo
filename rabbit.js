// Նապաստակը սնվումն է խոտով և կարող է ցատկել 1 վանդակ
var LivingCreature = require("./LivingCreature")
let random = require("./random");
module.exports = class rabbit extends LivingCreature {
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
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
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
            matrix[newY][newX] = 11;

            var grass = new rabbit(newX, newY);
            rabbitArr.push(grass);
            this.gender = random(gen)
            if(this.gender == "male"){
                this.energy = 8
            }
            else{
                this.energy = 6
            }
            RabbitStat++
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
        for (var i in rabbitArr) {
            if (this.x == rabbitArr[i].x && this.y == rabbitArr[i].y) {
                rabbitArr.splice(i, 1);
                break;
            }
        }
    }
}
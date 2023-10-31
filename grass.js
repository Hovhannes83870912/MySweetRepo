// Խոտը հասարակ կերպար է ում նպատակը բազմանալն է
var LivingCreature = require("./LivingCreature")
let random = require("./random");
module.exports = class Grass extends LivingCreature {
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var chooseObject = random(emptyCells);
        if (chooseObject && this.multiply >= 1) {
            var newX = chooseObject[0];
            var newY = chooseObject[1];
            matrix[newY][newX] = 1;
            var newGrass = new Grass(newX, newY);
            grasses.push(newGrass);
            this.multiply = 0;
            grassStat++
        }
    }
}
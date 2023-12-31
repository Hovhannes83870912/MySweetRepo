// Պռեդատորը ուտում է խոտակեր և նապաստակներ և պանտեռաներ։ Բազմանում է։
var LivingCreature = require("./LivingCreature")
let random = require("./random");
module.exports = class Predator extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.gender = random(gen)
    if(this.gender == "male"){
      this.energy = 5
    }
    else{
      this.energy = 3
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
chooseCell(character) {
    this.getNewCoordinates();
    return super.chooseCell(character);
}
  mul() {
    let found = this.chooseCell(0);
    let exact = random(found)

    if (exact && this.energy > 30) {
      let x = exact[0];
      let y = exact[1];

      let pre = new Predator(x, y);
      matrix[y][x] = 5;
      PredatorArr.push(pre);
      this.gender = random(gen)
      if(this.gender == "male"){
        this.energy = 5
      }
      else{
        this.energy = 3
      }
      PredatorsStat++
    }
  }
  eat() {
    let found1 = this.chooseCell(1);
    let found2 = this.chooseCell(2);
    let found3 = this.chooseCell(11);
    let found4 = this.chooseCell(12);
    let found = [found1, found2, found3, found4]
    let randomfound = random(found);
    let exact = random(randomfound)
    if (exact) {
      this.energy += 2;
      let x = exact[0];
      let y = exact[1];

      for (let i in grasses) {
        if (grasses[i].x == x && grasses[i].y == y) {
          grasses.splice(i, 1)
        }
      }
        for (let i in grassEaterArr) {
        if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
              grassEaterArr.splice(i, 1)
              console.log("i ate a grassEater");
        }
      }
      for (let i in rabbitArr) {
        if (rabbitArr[i].x == x && rabbitArr[i].y == y) {
            rabbitArr.splice(i, 1)
            console.log("i ate a rabbit");
        }
      }
      for (let i in pantherArr) {
        if (pantherArr[i].x == x && pantherArr[i].y == y) {
          pantherArr.splice(i, 1)
            console.log("i ate a panther");
        }
      }


      matrix[y][x] = 5
      matrix[this.y][this.x] = 0

      this.x = x;
      this.y = y

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
           if(this.energy > 26 && Str == "Garun"){
              this.mul()
           }
           if(this.energy > 32 && Str == "Ashun"){
              this.mul()
           }
       }
    } else {
      this.move()
    }
  }
  move() {
    console.log("this.energy" + this.energy)  
    let found = this.chooseCell(0);
    let exact = random(found)

    if (exact) {
      let x = exact[0];
      let y = exact[1];

      matrix[y][x] = 5
      matrix[this.y][this.x] = 0

      this.x = x;
      this.y = y;

      this.energy--

      if (this.energy < 0) {
        this.die()
      }
    } else {
      this.energy--
      if (this.energy < 0) {
        this.die()
      }
    }
  }
  die() {
    for (let i = 0; i < PredatorArr.length; i++) {
      if (PredatorArr[i].x == this.x && PredatorArr[i].y == this.y) {
        PredatorArr.splice(i, 1)
      }
    }
    matrix[this.y][this.x] = 0
  }
}

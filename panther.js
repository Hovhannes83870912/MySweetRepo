// Պանտեռան կարողանում է ուտել խոտակերներին և նապաստակներին։ Պանտեռան շարժվում է միանգամից 3 վանդակ բայց սրա պատճառով կարող է շուտ էներգազրկվել։
var LivingCreature = require("./LivingCreature")
let random = require("./random");
module.exports = class Panther extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.gender = random(gen)
    if(this.gender == "male"){
      this.energy = 6
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

      let pan = new Panther(x, y);
      matrix[y][x] = 12;
      pantherArr.push(pan);
      this.gender = random(gen)
      if(this.gender == "male"){
        this.energy = 6
      }
      else{
        this.energy = 3
      }
      pantherStat++
    }
  }
  eat() {
    for (let index = 0; index <= 2; index++) {

    let found1 = this.chooseCell(1);
    let found2 = this.chooseCell(2);
    let found3 = this.chooseCell(11);
    let found = [found1, found2, found3]
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


      matrix[y][x] = 12
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
      if (this.energy < 0) {
        this.die()
        break
      }
      else {
      this.energy--
      if (this.energy < 0) {
        this.die()
        break
      }
    }
    }
  }
  }
  move() {
    console.log("this.energy" + this.energy)  
    let found = this.chooseCell(0);
    let exact = random(found)

    if (exact) {
      let x = exact[0];
      let y = exact[1];

      matrix[y][x] = 12
      matrix[this.y][this.x] = 0

      this.x = x;
      this.y = y;

      this.energy--

    }
  }
  die() {
    for (let i = 0; i < pantherArr.length; i++) {
      if (pantherArr[i].x == this.x && pantherArr[i].y == this.y) {
        pantherArr.splice(i, 1)
      }
    }
    matrix[this.y][this.x] = 0
  }
}

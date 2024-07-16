class Car {
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;
  
    constructor(brand, model) {
      this.#brand = brand;
      this.#model = model;
    }
  
    displayInfo() {
      console.log(
        `Brand is ${this.#brand}, model is ${this.#model} and the speed is: ${this.speed}km/h, ${this.isTrunkOpen ? "trunk is open" : "trunk is closed"}`
      );
    }
  
    go() {
      if (!this.isTrunkOpen) {
        if (this.speed <= 195) {
          this.speed += 5;
        }
      }
    }
    brake() {
      if (this.speed >= 5) {
        this.speed -= 5;
      }
    }
  
    openTrunk() {
      if (this.speed > 0) {
        return;
      } else {
        this.isTrunkOpen = true;
      }
    }
    closeTrunk() {
      this.isTrunkOpen = false;
    }
  }
  
  class RaceCar extends Car{
      acceleration
  
      constructor(statistics){
          super(statistics.brand, statistics.model)
          this.acceleration=statistics.acceleration
      }
  
      go(){
          if (this.speed<=295) {
              this.speed+=this.acceleration
          }
      }
  
      displayInfo() {
          console.log(
            `Brand is ${this.brand}, model is ${this.model} and the speed is: ${this.speed}km/h`
          );
        }
  }
  
  
  let car1 = new Car("Toyota", "Supra");
  let car2 = new Car("BMW", "M5");
  let raceCar=new RaceCar({brand:'Ferrari', model:'F1', acceleration:20})
  
  car1.go();
  car1.openTrunk()
  car1.go();
  car1.go();
  car2.go();
  car2.brake();
  car2.brake();
  car2.openTrunk()
  car1.displayInfo();
  car2.displayInfo();
  
  raceCar.go()
  raceCar.go()
  raceCar.displayInfo();
  
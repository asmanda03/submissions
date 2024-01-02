class Vehicle {
    constructor(make,model,year){
        this.make =  make;
        this.model = model;
        this.year = year;
    } 
    honk(){
        return "Beep"
    }
    toString(){
        return `This vehicle is a ${this.make} ${this.model} from ${this.year}.`
    }   
}

class Car extends Vehicle{
    constructor(make,model,year){
        super(make,model,year);
    }
    numWheels(){
        return 4;
    }

}

class Motorcycle extends Vehicle{
    constructor(make,model,year){
        super(make,model,year);
    }
    numWheels(){
        return 2;
    }
    revEngine(){
        return "VROOM!!!"
    }
}
class Garage{
    constructor(max){
        this.max = max;
        

    }
    vehicles(){
        
        this.arr = [];
        return this.arr;
    }
    capacity(){ 
        if (this.arr.length >= this.max) {
            return "Sorry, we're full.";
          }
    }
    add(newVehicle){
        if(!(newVehicle instanceof Vehicle)){
            return "Only vehicles are allowed in here!";
        }
        this.arr.push(newVehicle);
        return "Vehicle added!"
    }
}

//code from solution
// let garage = new Garage(2);
// garage.vehicles; // []
// garage.add(new Car("Hyundai", "Elantra", 2015)); // "Vehicle added!"
// garage.vehicles; // [Car]
// garage.add("Taco"); // "Only vehicles are allowed in here!"

// garage.add(new Motorcycle("Honda", "Nighthawk", 2000));
// // "Vehicle added!"
// garage.vehicles; // [Car, Motorcycle]

// garage.add(new Motorcycle("Honda", "Nighthawk", 2001));
// // "Sorry, we're full."
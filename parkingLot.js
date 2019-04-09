/**
 *  Design a parking lot using object-oriented principles.
 *
 *  Solution: For our purposes right now, we’ll make the following assumptions.
 *            We made these specific assumptions to add a bit of complexity to the problem without
 *            adding too much. If you made different assumptions, that’s totally fine.
 *
 *    1) The parking lot has multiple levels. Each level has multiple rows of spots.
 *    2) The parking lot can park motorcycles, cars, and buses.
 *    3) The parking lot has motorcycle spots, compact spots, and large spots.
 *    4) A motorcycle can park in any spot.
 *    5) A car can park in either a single compact spot or a single large spot.
 *    6) A bus can park in five large spots that are consecutive and within the same row.
 *       It cannot park in small spots.
 *
 *  In the below implementation, we have created an abstract class Vehicle, from which Car,
 *  Bus, and Motorcycle inherit. To handle the different parking spot sizes, we have just one
 *  class ParkingSpot which has a member variable indicating the size.
 */

const VehicleType = Object.freeze({
  MOTORCYCLES: "Motorcycle",
  COMPACT: "Compact",
  SUV: "Suv",
  BUS: "Bus"
});

const tmp = ["MOTORCYCLES", "COMPACT", "SUV", "BUS"];

// for (let i in tmp) console.log(i);
// for (let i of tmp) console.log(i)


function calculateObjLen(obj) {
  let size = 0;
  for (let key of Object.keys(obj)) size++;
  return size;
}

class Vehicle {
  constructor(vehicleType, spaceNeeded) {
    this.parkingSopt = []; // ParkingSpot[]
    this.vehicleType = vehicleType;
    this.spaceNeeded = spaceNeeded;
    this.parkingLevel;
  }

  parkingInSpot(level, spots) {
    this.parkingLevel = level;
    for (let spot in spots) {
      this.parkingSopt.concat(spots);
      spot.parkVehicle(this);
    }
  }

  departureSpot() {
    for (let spot in this.parkingSopt) {
      spot.removeVehicle();
    }
    this.parkingSpot.clear();
    this.parkingLevel.departureVehicle(this);
  }

  getVehicleType() {
    return this.vehicleType;
  }

  getSpotsNeeded() {
    return this.spotsNeeded;
  }
}

class Bus extends Vehicle {
  constructor() {
    super(VehicleType.BUS, 5);
  }
  // @Override
  canFitInSpot(parkInSpot) {
    return VehicleType.BUS === parkInSpot.getSpotType(this);
  }
}

class Suv extends Vehicle {
  constructor() {
    super(VehicleType.SUV, 3);
  }

  // @Override
  canFitInSpot(parkingSpot) {
    return (VehicleType.SUV === parkingSpot.getSpotType() ||
            VehicleType.BUS === parkingSpot.getSpotType())
  }
}

class Compact extends Vehicle {
  constructor() {
    super(VehicleType.COMPACT, 1);
  }

  // @Override
  canFitInSpot(parkingSpot) {
    return (VehicleType.SUV === parkingSpot.getSpotType() ||
            VehicleType.BUS === parkingSpot.getSpotType() ||
            VehicleType.COMPACT === parkingLot.getSpotType());
  }
}

class Motorcycle extends Vehicle {
  constructor() {
    super(VehicleType.MOTORCYCLES, 1);
  }

  // @Override
  canFitInSpot(parkingSpot) {
  //   return (VehicleType.SUV === parkingSpot.getSpotType() ||
  //           VehicleType.BUS === parkingSpot.getSpotType() ||
  //           VehicleType.COMPACT === parkingLot.getSpotType() ||
  //           VehicleType.MOTORCYCLES === parkingLot.getSpotType());
  // }
    return true;
  }
}

class ParkingSpot {
  constructor(spotType, spotId, row, level) {
    this.vehicle = null;
    this.spotType = spotType;
    this.spotId = spotId;
    this.row = row;
    this.level = level;
  }

  isAvailable() {
    return this.vehicle === null;
  }

  parkVehicle(vehicle) {
    this.vehicle = vehicle;
  }

  removeVehicle() {
    this.vehicle = null;
  }

  getVehicle() {
    return this.vehicle;
  }

  getSpotType() {
    return this.spotType;
  }

  getSpotId() {
    return this.spotId;
  }

  getRow() {
    return this.row;
  }

  getLevel() {
    return this.level;
  }
}

class Level {
  constructor(floor) {
    this.NUM_OF_ROWS = 2;
    this.SPOTS_PER_ROW = 5;
    this.floor = floor;
    this.spots = [];
    this.availableSpace = this.NUM_OF_ROWS * this.SPOTS_PER_ROW;

    for (let i = 0; i < this.NUM_OF_ROWS; i++) {
      this.spots[i] = [];
      for (let j = 0; j < this.SPOTS_PER_ROW; j++) {
        let vehicle = tmp[Math.floor(Math.random() * tmp.length)];
        this.spots[i][j] = new ParkingSpot(vehicle, j, i, this);
      }
    }
  }

  canParkVehicle(vehicle) {
    for (let i = 0; i < this.NUM_OF_ROWS; i++) {
      let spots = this.canParkVehicleInRow(i, vehicle);
      if (spots.length) return spots;
    }
    return [];
  }

  canParkVehicleInRow(rowIdx, vehicle) {
    let row = this.spots[rowIdx];
    let spaceNeeded = vehicle.getSpotsNeeded();

    let count = 0;
    let spots = [];
    for (let i in row) {
      let spot = row[i];
      if (spot.isAvailable() && vehicle.canFitInSpot(spot)) {
        count++;
        spots.push(spot);
      } else {
        count = 0;
        spots.clear();
      }
    }

    if (count >= spaceNeeded) return spots;
    return [];
  }

  parkVehicle(vehicle, spots) {
    vehicle.parkingInSpot(this, spots);
    this.availableSpace -= vehicle.spaceNeeded;
  }

  departureVehicle(vehicle) {
    this.availableSpace += vehicle.spaceNeeded;
  }

  getFloor() {
    return this.floor;
  }

  getAvailableSports() {
    return this.availableSpace;
  }
}

class ParkingLot {
  constructor(numOfFloor) {
    this.levels = [];
    for (let i = 0; i < numOfFloor; i++) {
      this.levels[i] = new Level(i);
    }
  }

  canParkVehicle(vehicle) {
    for (let level of this.levels) {
      if (level.canParkVehicle(vehicle).length !== 0) return true;
    }
    return false;
  }

  vehicleParking(vehicle) {
    for (let level of this.levels) {
      var spots = level.canParkVehicle(vehicle);
      if (spots.length !== 0) {
        level.parkVehicle(vehicle, spots);
        return;
      }
    }
  }

  vehicleDeparture(vehicle) {
    vehicle.departureSpot();
  }
}

let parkingLot = new ParkingLot(2);
let level = parkingLot.levels;

let mot1 = new Motorcycle();
let mot2 = new Motorcycle();
let mot3 = new Motorcycle();
let mot4 = new Motorcycle();
let mot5 = new Motorcycle();

let bus1 = new Bus();
let bus2 = new Bus();
let bus3 = new Bus();

let suv1 = new Suv();
let suv2 = new Suv();
let suv3 = new Suv();

let com1 = new Compact();
let com2 = new Compact();
let com3 = new Compact();

console.log(parkingLot.vehicleParking(mot1));

// mot1.parkingInSpot(level[0], level[0].spots[0][4]);

// bus1.parkingInSpot(level[0], level[0].spots);
// console.log(level[0]);
// console.log();

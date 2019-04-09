var ParkingDeleagtor = require('./parkingDelegator');

function ParkingManager() {
  ParkingDeleagtor.apply(this,arguments);
  this.parkStuffs = [];
}

ParkingManager.prototype = Object.create(ParkingDeleagtor.prototype);
ParkingManager.prototype.constructor = ParkingManager;

ParkingManager.prototype.parkContainers = function (){
  return this.parkStuffs;
}

ParkingManager.prototype.addParkStuff = function (parkStuff) {
  this.parkStuffs.push(parkStuff);
  return this;
}

module.exports = ParkingManager;
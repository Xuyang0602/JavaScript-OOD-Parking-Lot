var ParkingDeleagtor = require('./parkingDelegator');

function ParkingBoy() {
  ParkingDeleagtor.apply(this, arguments);
  this.lots = [];
}

ParkingBoy.prototype = Object.create(ParkingDeleagtor.prototype);
ParkingBoy.prototype.constructor = ParkingBoy;

ParkingBoy.prototype.parkContainers = function () {
  return this.lots;
}

ParkingBoy.prototype.addLot = function (lot) {
  this.lots.push(lot);
  return this;
};

ParkingBoy.prototype.restCapability = function () {
  return this.parkContainers().reduce(function (previous, current) {
    return previous.restCapability() + current.restCapability();
  });
};

ParkingBoy.prototype.capability = function () {
  return this.parkContainers().reduce(function (previous, current) {
    return previous.capability() + current.capability;
  });
}

module.exports = ParkingBoy;
var Strategy = require('./strategy');

function ParkingDelegator() {
  this.strategy = Strategy.quickStrategy;
}

ParkingDelegator.prototype.constructor = ParkingDelegator;

ParkingDelegator.prototype.setStrategy = function (strategy) {
  this.strategy = strategy;
  return this;
}

ParkingDelegator.prototype.park = function (car) {
  var parkContainer = this.strategy.whereToPark(this.parkContainers());
  if (parkContainer) {
    return parkContainer.park(car);
  }
  return null;
}

ParkingDelegator.prototype.fetchCar = function (ticket) {
  var car;
  for (var i = 0; i < this.parkContainers().length; i++) {
    car = this.parkContainers()[i].fetchCar(ticket);
    if (car) {
      return car;
    }
  }
  return null;
}

module.exports = ParkingDelegator;
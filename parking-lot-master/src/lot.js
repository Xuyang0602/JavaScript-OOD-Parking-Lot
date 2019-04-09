var Ticket = require("./ticket");

function Lot(capability) {
  this._capability = capability || 0;
  this._restCapability = capability;
  this._cars = [];
  this._tickets = [];
}

Lot.prototype.constructor = Lot;

Lot.prototype.restCapability = function () {
  return this._restCapability;
};

Lot.prototype.capability = function () {
  return this._capability;
};

Lot.prototype.park = function (car) {
  if (this._restCapability > 0) {
    this._restCapability--;
    this._cars.push(car);
    var ticket = new Ticket();
    ticket._fromWhere = this;
    this._tickets.push(ticket);
    return ticket;
  }
  return null;
};

Lot.prototype.fetchCar = function (ticket) {
  this._capability++;
  var carIndex = this._tickets.indexOf(ticket);
  if (carIndex != -1) {
    this._tickets.splice(carIndex, 1)
    return this._cars.splice(carIndex, 1)[0];
  }
  return null;
};

module.exports = Lot;
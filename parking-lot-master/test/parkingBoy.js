var should = require('should');
var Car = require('../src/car');
var Lot = require('../src/lot');
var ParkingBoy = require('../src/parkingBoy');
var strategyFactory = require('../src/strategy');
var car;
var parkingBoy;

beforeEach(function () {
  car = new Car();
  parkingBoy = new ParkingBoy().setStrategy(strategyFactory.quickStrategy);
});

describe("Parking boy", function () {

  it("can park car in the first available lot", function () {
    var disabledLot = new Lot(0);
    var enabledLot = new Lot(1);
    parkingBoy.addLot(disabledLot).addLot(enabledLot);
    var car = new Car();
    var ticket = parkingBoy.park(car);
    parkingBoy.fetchCar(ticket).should.be.exactly(car);

  });

  it("can't park when there is no available lot", function () {
    var disabledLot = new Lot(0);
    parkingBoy.addLot(disabledLot);
    var ticket = parkingBoy.park(new Car());
    should(ticket).be.exactly(null);
  });

  it("can fetch car from correct lot", function () {
    var enabledLot = new Lot(1);
    parkingBoy.addLot(enabledLot);
    var ticket = parkingBoy.park(car);
    parkingBoy.fetchCar(ticket).should.be.exactly(car);
  })

});


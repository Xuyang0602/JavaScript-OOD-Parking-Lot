var Car = require('../src/car');
var Lot = require('../src/lot');
var ParkingBoy = require('../src/parkingBoy');
var strategyFactory = require('../src/strategy');
var Should =  require('should');

describe("smart parking boy", function () {
  it("can park car in highest vacancy lot", function () {
    var lowVacancyLot = new Lot(5);
    var highVacancyLot = new Lot(10);
    highVacancyLot.park(new Car());

    var vacancyStrategy = strategyFactory.vacancyStrategy;
    var smartParkingBoy = new ParkingBoy().setStrategy(vacancyStrategy).addLot(lowVacancyLot).addLot(highVacancyLot);
    var car = new Car();
    var ticket = smartParkingBoy.park(car);
    Should(lowVacancyLot.fetchCar(ticket)).be.exactly(null);
    highVacancyLot.fetchCar(ticket).should.be.exactly(car);
  })
})
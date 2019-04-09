var Car = require('../src/car');
var Lot = require('../src/lot');
var ParkingBoy = require('../src/parkingBoy');
var strategyFactory = require ('../src/strategy');
var Should =  require('should');

describe("super parking boy", function () {
  it("can park car in highest vacancy rate lot", function () {
    var highVacancyRateLot = new Lot(3);
    var lowVacancyRateLot = new Lot(10);
    lowVacancyRateLot.park(new Car());

    var vacancyRateStrategy = strategyFactory.vacancyRateStrategy;
    var superParkingBoy = new ParkingBoy().setStrategy(vacancyRateStrategy).addLot(highVacancyRateLot).addLot(lowVacancyRateLot);
    var car = new Car();
    var ticket = superParkingBoy.park(car);

    Should(lowVacancyRateLot.fetchCar(ticket)).be.exactly(null);
    highVacancyRateLot.fetchCar(ticket).should.be.exactly(car);
  })
})
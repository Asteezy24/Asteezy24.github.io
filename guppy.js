var _ = require('lodash');
var log = require('../core/log.js');

var method = {};

method.init = function() {
  this.name = 'guppy';

  this.currentTrend;
  this.requiredHistory = 0;

  // define the indicators we need
  //this.addIndicator('dema', 'DEMA', this.settings);

  //Determine if we first want to buy or sell
  if(this.settings.firstTrade === 'buy') {
    this.currentTrend = 'down';
  }
  else if(this.settings.firstTrade === 'sell'){
    this.currentTrend = 'up';
  }


  this.addTalibIndicator('EMA3', 'ema', {optInTimePeriod : 3});
  this.addTalibIndicator('EMA5', 'ema', {optInTimePeriod : 5});
  this.addTalibIndicator('EMA8', 'ema', {optInTimePeriod : 8});
  this.addTalibIndicator('EMA10', 'ema', {optInTimePeriod : 10});
  this.addTalibIndicator('EMA12', 'ema', {optInTimePeriod : 12});


  this.addTalibIndicator('EMA30', 'ema', {optInTimePeriod : 30});
  this.addTalibIndicator('EMA35', 'ema', {optInTimePeriod : 35});
  this.addTalibIndicator('EMA40', 'ema', {optInTimePeriod : 40});
  this.addTalibIndicator('EMA45', 'ema', {optInTimePeriod : 45});
  this.addTalibIndicator('EMA50', 'ema', {optInTimePeriod : 50});



  log.debug(this.name+' Strategy initialized');

}

// what happens on every new candle?
method.update = function(candle) {
  // nothing!
}

// for debugging purposes: log the last calculated
// EMAs and diff.
method.log = function() {
  var ema3 = this.talibIndicators.EMA3;
  var ema5 = this.talibIndicators.EMA5;
  var ema8 = this.talibIndicators.EMA8;
  var ema10 = this.talibIndicators.EMA10;
  var ema12 = this.talibIndicators.EMA12;

  var ema30 = this.talibIndicators.EMA30;
  var ema35 = this.talibIndicators.EMA35;
  var ema40 = this.talibIndicators.EMA40;
  var ema45 = this.talibIndicators.EMA45;
  var ema50 = this.talibIndicators.EMA50;




  log.debug('calculated EMA properties for candle:');

  log.debug('\t EMA3 :', ema3.result);
  log.debug('\t EMA5 :', ema5.result);
  log.debug('\t EMA8 :', ema8.result);
  log.debug('\t EMA10 :', ema10.result);
  log.debug('\t EMA12 :', ema12.result);


  log.debug('\t EMA30 :', ema30.result);
  log.debug('\t EMA35 :', ema35.result);
  log.debug('\t EMA40 :', ema40.result);
  log.debug('\t EMA45 :', ema45.result);
  log.debug('\t EMA50 :', ema50.result);
}

method.check = function(candle) {

  var ema3Result = this.talibIndicators.EMA3.result.outReal;
  var ema5Result = this.talibIndicators.EMA5.result.outReal;
  var ema8Result = this.talibIndicators.EMA8.result.outReal;
  var ema10Result = this.talibIndicators.EMA10.result.outReal;
  var ema12Result = this.talibIndicators.EMA12.result.outReal;

  var ema30Result = this.talibIndicators.EMA30.result.outReal;
  var ema35Result = this.talibIndicators.EMA35.result.outReal;
  var ema40Result = this.talibIndicators.EMA40.result.outReal;
  var ema45Result = this.talibIndicators.EMA45.result.outReal;
  var ema50Result = this.talibIndicators.EMA50.result.outReal;



  var price = candle.close;
  log.debug('price ', message);

  var message = '@ ' + price.toFixed(8);


  //DEMA Golden Cross
  if(ema3Result > ema30Result && ema12Result > ema30Result) {
    log.debug('we are currently in uptrend', message);

    if(this.currentTrend !== 'up') {
      this.currentTrend = 'up';
      this.advice('long');
      log.debug("Going to buy");
    } else {
      log.debug("Nothing to buy");
      this.advice();
    }

  } else if(ema3Result < ema30Result && ema12Result < ema30Result) { //death cross
    log.debug('we are currently in a downtrend', message);

    if(this.currentTrend !== 'down') {
      this.currentTrend = 'down';
      this.advice('short');
      log.debug("Going to sell");
    } else
      log.debug("Nothing to sell");
      this.advice();

  } else {
    log.debug('we are currently not in an up or down trend', message);
    this.advice();
  }
}

module.exports = method;

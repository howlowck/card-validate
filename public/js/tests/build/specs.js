(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var Card = function (data) {
  this.fullName;
  this.shortName;
  this.regex;
  this.partialRegex;
  this.validLength;
  this.isLuhn;
  this.initialize(data);
};

Card.prototype.initialize = function (data) {
  this.fullName = data['name'];
  this.shortName = data['shortName'];
  this.regex = data['regex'];
  this.partialRegex = data['partial'];
  this.validLength = data['validLength'];
  this.isLuhn = data['luhn'];
};

Card.prototype.sanitize = function (num) {
  return num.replace(' ', '');
};

Card.prototype.testPartial = function (num) {
  val = this.sanitize(num);
  return this.partialRegex.test(val);
};

Card.prototype.validateNumber = function (num) {
  var cardNum = this.sanitize(num),
      isNum = ! isNaN(cardNum),
      regexPassed = this.regex.test(cardNum),
      lengthPassed = this.validLength.indexOf(cardNum.length) > -1,
      luhnPassed;

  if (this.isLuhn) {
    luhnPassed = this.testLuhn(cardNum);
  }

  if (isNum && regexPassed && lengthPassed && luhnPassed) {
    return true;
  }

  return false;
};

Card.prototype.testLuhn = function (cardNum) {
    var passed = false;
    var checksum = +cardNum.slice(-1);
    var numRevArray = cardNum.slice(0, -1).split('').reverse();
    var total = 0;
    for (var i = 0; i < numRevArray.length; i++) {
      var num = numRevArray[i],
          s, val, rem;
      if (i % 2 == 0) {
        val = +num * 2;
        rem = val % 10;
        s = val / 10 >= 1 ? 1 + rem : rem;
      } else {
        s = +num;
      }
      total += s;
    }
    total += checksum;
    return total % 10 === 0;
};

module.exports = Card;

},{}],2:[function(require,module,exports){
var Card = require('./Card');

var visa = new Card({
  partial: /^4/,
  regex: /^4/,
  validLength: [13, 16],
  luhn: true,
  name: 'Visa',
  shortName: 'visa'
});

var discover = new Card({
    partial: /^(6($|0($|1($|1))|5|2($|2)))/, //not robust
    regex: /^(6011|65|622(1(2[6-9][0-9]{2}|[3-9][0-9]{3})|[2-8][0-9]{4}|9([01][0-9]{3}|2[0-5][0-9]{2}))).*$/,
    validLength: [16],
    luhn: true,
    name: 'Discover',
    shortName: 'discover'
  });

var jcb = new Card({
  partial: /^3($|5($|2($|[89]($|[0-9]))|[3-8]($|[0-9])))/,
  regex: /^(3088|3096|3112|3158|3337|35(2[89][0-9]{4}|[3-8][0-9]{5}))/,
  validLength: [16],
  luhn: true,
  name: 'JCB',
  shortName: 'jcb'
});

var amex = new Card({
  partial: /^3($|4|7)/,
  regex: /^3(4|7)/,
  validLength: [15],
  luhn: true,
  name: 'American Express',
  shortName: 'amex'
});

var master = new Card({
  partial: /^5($|[1-5])/,
  regex: /^5[1-5]/,
  validLength: [16],
  luhn: true,
  name: 'MasterCard',
  shortName: 'master'
});

var diners = new Card({
  partial: /^3($|0|6|8)/,
  regex: /^3(0|6|8)/,
  validLength: [14],
  luhn: true,
  name: 'Diner\'s Club International',
  shortName: 'diners-int'
});

var dinersUS = new Card({
  partial: /^5($|4|5)/,
  regex: /^5[4-5]/,
  validLength: [16],
  luhn: true,
  name: 'Diner\'s Club US/Canada',
  shortName: 'diners-us'
});

var CardVal = {
  cards: [visa, discover, jcb, amex, master, diners, dinersUS],
  detectTypes: function (cardNum) {
    var result = [];
    for (var i=0; i < this.cards.length; i++) {
      var card = this.cards[i];
      if (card.testPartial(cardNum)) {
        result.push(card.fullName);
      }
    }
    return result;
  },
  validateNumber: function (cardNum) {
    for (var i=0; i < this.cards.length; i++) {
      var card = this.cards[i];
      if (card.validateNumber(cardNum)) {
        return this.validationOutput(card);
      }
    }
    return {
      valid: false
    }
  },
  validationOutput: function (card) {
    return {
      valid: true,
      name: card.fullName
    }
  }
};

module.exports = CardVal;

},{"./Card":1}],3:[function(require,module,exports){
var Cred = require('../main');
// describe("Cred Type Detection", function() {
//   it("should detect visa very quickly", function () {
//     var actual = Cred.detectTypes('4');
//     console.log(actual);
//     expect(actual).toEqual(['visa']);
//   });
//   it("should detect multiple cards", function () {
//     var actual = Cred.detectTypes('30');
//     console.log(actual);
//     expect(actual).toEqual(['jcb', 'diners']);
//   });
// });

describe("Cred Validation Capabilities", function() {
  it("should validate visa", function() {
    var actual = Cred.validateNumber('4242424242424242');
    expect(actual.name).toEqual('Visa');
    var actual = Cred.validateNumber('4012888888881881');
    expect(actual.name).toEqual('Visa');
    var actual = Cred.validateNumber('4000056655665556');
    expect(actual.name).toEqual('Visa');
  });

  it ("should validate discover", function () {
    var actual = Cred.validateNumber('6011000990139424');
    expect(actual.name).toEqual('Discover');
    actual = Cred.validateNumber('6229259890139425');
    expect(actual.name).toEqual('Discover');
  });

  it ("should validate JCB", function () {
    var actual = Cred.validateNumber('3530111333300000');
    expect(actual.name).toEqual('JCB');
    actual = Cred.validateNumber('3566002020360505');
    expect(actual.name).toEqual('JCB');
  });

  it ("should validate mastercard", function () {
    var actual = Cred.validateNumber('5105105105105100');
    expect(actual.name).toEqual('MasterCard');

    actual = Cred.validateNumber('5555555555554444');
    expect(actual.name).toEqual('MasterCard');

    actual = Cred.validateNumber('5200828282828210');
    expect(actual.name).toEqual('MasterCard');
  });

  it ("should validate american express", function () {
    var actual = Cred.validateNumber('378282246310005');
    expect(actual.name).toEqual('American Express');

    actual = Cred.validateNumber('371449635398431');
    expect(actual.name).toEqual('American Express');
  });

  it ("should validate diners club", function () {
    var actual = Cred.validateNumber('30569309025904');
    expect(actual.name).toEqual('Diner\'s Club International');

    actual = Cred.validateNumber('38520000023237');
    expect(actual.name).toEqual('Diner\'s Club International');
  });
});

describe("Cred Validation", function() {
  it("should check invalidate numbers", function() {
    var actual = Cred.validateNumber('9242424242424242');
    expect(actual.valid).toEqual(false);
    actual = Cred.validateNumber('5942424242424242');
    expect(actual.valid).toEqual(false);
  });
});

},{"../main":2}]},{},[3])
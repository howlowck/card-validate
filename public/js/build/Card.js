!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.CardVal=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

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

},{}]},{},[1])
(1)
});
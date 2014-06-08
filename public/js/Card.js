
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

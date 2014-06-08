var Card = require('./Card');

var visa = new Card({
  regex: /^4.*$/,
  validLength: [13, 16],
  luhn: true,
  name: 'Visa',
  shortName: 'visa'
});

var discover = new Card({
    regex: /^(6011|65|622(1(2[6-9][0-9]{2}|[3-9][0-9]{3})|[2-8][0-9]{4}|9([01][0-9]{3}|2[0-5][0-9]{2}))).*$/,
    validLength: [16],
    luhn: true,
    name: 'Discover',
    shortName: 'discover'
  });

var enroute = new Card({
  regex: /^(2014|2149).*$/,
  validLength: [15],
  luhn: true,
  name: 'enRoute',
  shortName: 'enroute'
});

var jcb = new Card({
  regex: /^(3088|3096|3112|3158|3337|35(2[89][0-9]{4}|[3-8][0-9]{5})).*$/,
  validLength: [16],
  luhn: true,
  name: 'JCB',
  shortName: 'jcb'
});

var amex = new Card({
  regex: /^3(4|7).*$/,
  validLength: [15],
  luhn: true,
  name: 'American Express',
  shortName: 'amex'
});

var master = new Card({
  regex: /^5[1-5].*$/,
  validLength: [16],
  luhn: true,
  name: 'MasterCard',
  shortName: 'master'
});

var diners = new Card({
  regex: /^3[0|6|8].*$/,
  validLength: [14],
  luhn: true,
  name: 'Diner\'s Club',
  shortName: 'diners'
});

var CardVal = {
  cards: [visa, discover, enroute, jcb, amex, master, diners],
  detectTypes: function (cardNum) {
    var result = [];
    //TODO
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

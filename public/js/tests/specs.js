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

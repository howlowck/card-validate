# Credit Card Validation

Validates of a credit card number is valid, and tells you what kind of card it is.

## Supported Card:
- Discover
- Visa
- JCB
- Diner's Club
- MasterCard
- American Express

## Features:
- UMD enabled (Global: CardVal)
- Luhn Algorithm included

## example:

`CardVal.validateNumber('4242424242424242')`

output:  
```
{
  valid: true,
  name: 'Visa'
}
```

## Technical Assignment

- Name: Phan Thái Dương
- Class: Gemo - Technical
- Assignment: Pricing

## Documentation

The program contains two model `Drink` and `Food` which represents the Menu items and its corresponding prices.

### Drink Class

The `Drink` class is responsible for creating a new drink menu item object. It has the following properties:

#### Properties

- `drink`: a string representing the name of the drink.
- `type`: a string representing the type of the drink (hot, cold, or blended).
- `size`: a string representing the size of the drink (S, M, L, or XL).
- `hasWhippingCream`: a boolean representing whether the drink has whipping cream or not.
- `milkOption`: a string representing the type of milk in the drink (none, whole_milk, or almond_milk).
- `chocolateSaucePumps`: a number representing the number of chocolate sauce pumps in the drink.
- `price`: a number representing the total price of the drink.

#### Methods

- `getBasePriceByDrink()`: a method that returns the base price of the drink based on its name.
- `getTypeAdjustment()`: a method that returns the price adjustment based on the type of the drink (hot, cold, or blended).
- `getSizeAdjustment()`: a method that returns the price adjustment based on the size of the drink.
- `getWhippingCreamAdjustment()`: a method that returns the price adjustment based on whether the drink has whipping cream or not.
- `getMilkOptionAdjustment()`: a method that returns the price adjustment based on the type of milk in the drink.
- `getChocolateSauceAdjustment()`: a method that returns the price adjustment based on the number of chocolate sauce pumps in the drink.
- `setPrice()`: a method that calculates and sets the total price of the drink based on the above adjustments and the base price.

### Food Class

The `Food` class is responsible for creating a new food menu item object. It has the following properties:

#### Properties

- `type`: a string representing the type of the food (sandwich or bagel).
- `additionalFoods`: an array of strings representing the additional foods added to the food.
- `price`: a number representing the total price of the food.

#### Methods

- `getBasePrice()`: a method that returns the base price of the food.
- `getCustomizationPrice()`: a method that returns the price adjustment based on the additional foods added to the food.
- `setPrice()`: a method that calculates and sets the total price of the food based on the above adjustments and the base price.

### Constants

There are several constant variables used :

#### Drink constants

- `TYPE_DRINKS_BASE_PRICES`: an object that contains the base prices for each drink type.
- `TYPE_ADJUSTMENTS`: an object that contains the price adjustments for each drink type.
- `SIZE_ADJUSTMENTS`: an object that contains the price adjustments for each drink size.
- `MILK_OPTION_ADJUSTMENTS`: an object that contains the price adjustments for each type of milk.
- `WHIPPING_CREAM_ADJUSTMENT`: a number representing the price adjustment for having whipping cream.
- `CHOCOLATE_SAUCE_PUMP_PRICE`: a number representing the price of each chocolate sauce pump.
- `MAX_CHOCOLATE_SAUCE_PUMPS`: a number representing the maximum number of chocolate sauce pumps allowed.

#### Food constants:

- `FOOD_BASE_PRICE`: an object that contains the base price for food.
- `FOOD_CUSTOMIZATIONS`: an object that contains the price for additional food of default food.

### Pattern is used:

The Factory Pattern is used in this program to create MenuItem objects. The Drink and Food classes both extend the MenuItem class and use a constructor to create objects. This pattern allows the program to create objects of different types using a common interface, which simplifies object creation and makes the code more modular.

### Usage

Here's an example usage:

#### Requirement 1: calculatePrice1

```javascript
console.log("[TEST] requirement 1");
const drink1 = new Drink("coffee", "hot", "S", false, "none");

console.log(drink1.displayTotalPrice());

const drink2 = new Drink("coffee", "cold", "M", true, "almond_milk");

console.log(drink2.displayTotalPrice());
```

```javascript
[TEST] requirement 1
{
  drink: 'coffee',
  type: 'hot',
  size: 'S',
  hasWhippingCream: false,
  milkOption: 'none',
  chocolateSaucePumps: 0,
  price: '2.00'
}
{
  drink: 'coffee',
  type: 'cold',
  size: 'M',
  hasWhippingCream: true,
  milkOption: 'almond_milk',
  chocolateSaucePumps: 0,
  price: '3.50'
}
```

#### Requirement 2: calculatePrice2

```javascript
console.log("[TEST] requirement 2");
const drink3 = new Drink("coffee", "blended", "L", true, "none");

console.log(drink3.displayTotalPrice());

const drink4 = new Drink("milk_tea", "cold", "XL", false, "whole_milk");

console.log(drink4.displayTotalPrice());
```

```javascript
[TEST] requirement 2
{
  drink: 'coffee',
  type: 'blended',
  size: 'L',
  hasWhippingCream: true,
  milkOption: 'none',
  chocolateSaucePumps: 0,
  price: '4.50'
}
{
  drink: 'milk_tea',
  type: 'cold',
  size: 'XL',
  hasWhippingCream: false,
  milkOption: 'whole_milk',
  chocolateSaucePumps: 0,
  price: '3.75'
}
```

#### Requirement 3: calculatePrice3

```javascript
console.log("[TEST] requirement 3");
const drink5 = new Drink("coffee", "hot", "XL", true, "none", 4);
console.log(drink5.displayTotalPrice());

const drink6 = new Drink("milk_tea", "cold", "L", false, "almond_milk");
console.log(drink6.displayTotalPrice());
```

```javascript
[TEST] requirement 3
{
  drink: 'coffee',
  type: 'hot',
  size: 'XL',
  hasWhippingCream: true,
  milkOption: 'none',
  chocolateSaucePumps: 4,
  price: '5.00'
}
{
  drink: 'milk_tea',
  type: 'cold',
  size: 'L',
  hasWhippingCream: false,
  milkOption: 'almond_milk',
  chocolateSaucePumps: 0,
  price: '3.75'
}
```

#### Requirement 4: calculatePrice4

```javascript
console.log("[TEST] requirement 4");
const food1 = new Food("sandwich", ["turkey", "egg"]);
console.log(food1.displayTotalPrice());

const food2 = new Food("bagel", ["butter", "creamCheese"]);
console.log(food2.displayTotalPrice());
```

```javascript
[TEST] requirement 4
{
  type: 'sandwich',
  additionalFoods: [ 'turkey', 'egg' ],
  price: '5.00'
}
{
  type: 'bagel',
  additionalFoods: [ 'butter', 'creamCheese' ],
  price: '4.00'
}
```

#### Requirement 5: calculatePrice5

```javascript
console.log("[TEST] requirement 5");
const factory = new MenuItemFactory();
const order1 = new Order();
const item1 = factory.createMenuItem(
  "drink",
  "coffee",
  "cold",
  "M",
  true,
  "none"
);
order1.addItem(item1);

const item2 = factory.createMenuItem("food", "sandwich", ["egg"]);
order1.addItem(item2);

const item3 = new Food("bagel", ["butter"]);
order1.addItem(item3);

console.log(order1.calculateTotalPrice());
```

```javascript
[TEST] requirement 5
{
  itemPrices: [
    { name: 'Drink', price: 3 },
    { name: 'Food', price: 4 },
    { name: 'Food', price: 3.5 }
  ],
  totalPriceBeforeTax: 10.5,
  tax: 0.76125,
  totalPriceAfterTax: 11.26125
}
```

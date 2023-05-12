// const Drink = require("./drink.js");
const MenuItemFactory = require("./factory/menuItemFactory");
const Order = require("./factory/order.js");
const Drink = require("./model/drink.js");
const Food = require("./model/food.js");

// Test cases:
// Requirement 1: calculatePrice1
console.log("[TEST] requirement 1");
const drink1 = new Drink("coffee", "hot", "S", false, "none");

console.log(drink1.displayTotalPrice());

const drink2 = new Drink("coffee", "cold", "M", true, "almond_milk");

console.log(drink2.displayTotalPrice());

// Requirement 2: calculatePrice2
console.log("[TEST] requirement 2");
const drink3 = new Drink("coffee", "blended", "L", true, "none");

console.log(drink3.displayTotalPrice());

const drink4 = new Drink("milk_tea", "cold", "XL", false, "whole_milk");

console.log(drink4.displayTotalPrice());

// Requirement 3: calculatePrice3
console.log("[TEST] requirement 3");
const drink5 = new Drink("coffee", "hot", "XL", true, "none", 4);
console.log(drink5.displayTotalPrice());

const drink6 = new Drink("milk_tea", "cold", "L", false, "almond_milk");
console.log(drink6.displayTotalPrice());

// Requirement 4: calculatePrice4
console.log("[TEST] requirement 4");
const food1 = new Food("sandwich", ["turkey", "egg"]);
console.log(food1.displayTotalPrice());

const food2 = new Food("bagel", ["butter", "creamCheese"]);
console.log(food2.displayTotalPrice());

// Requirement 5: calculatePrice5
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

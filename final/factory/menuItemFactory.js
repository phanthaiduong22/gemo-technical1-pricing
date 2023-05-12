const Drink = require("../model/drink.js");
const Food = require("../model/food");

class MenuItemFactory {
  createMenuItem(type, ...args) {
    switch (type) {
      case "drink":
        return new Drink(...args);
      case "food":
        return new Food(...args);
      default:
        throw new Error("Invalid item type.");
    }
  }
}

module.exports = MenuItemFactory;

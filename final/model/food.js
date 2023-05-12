const MenuItem = require("../factory/menuItem");

const FOOD_BASE_PRICE = 3;

const FOOD_CUSTOMIZATIONS = {
  sandwich: {
    egg: 1,
    turkey: 1,
  },
  bagel: {
    butter: 0.5,
    creamCheese: 0.5,
  },
};

class Food extends MenuItem {
  constructor(type, additionalFoods) {
    super();
    this.type = type;
    this.additionalFoods = additionalFoods;
    this.setPrice();
  }

  getBasePrice() {
    return FOOD_BASE_PRICE;
  }

  getCustomizationPrice() {
    const foodCustomization = FOOD_CUSTOMIZATIONS[this.type];
    if (!foodCustomization) {
      throw new Error(`Invalid food type: ${this.type}`);
    }

    let additionalFoods = this.additionalFoods;
    let additionalFoodsPrice = 0;
    for (let i = 0; i < additionalFoods.length; i++) {
      let additionalFood = additionalFoods[i];
      let additionalFoodPrice = foodCustomization[additionalFood];
      if (additionalFoodPrice == undefined) {
        throw new Error(
          `Invalid additionalFood: ${additionalFood} for food: ${this.type}`
        );
      }
      additionalFoodsPrice += additionalFoodPrice;
    }
    return additionalFoodsPrice;
  }

  setPrice() {
    const basePrice = this.getBasePrice();
    const customizationPrice = this.getCustomizationPrice();
    const totalPrice = basePrice + customizationPrice;
    this.price = totalPrice;
  }

  displayTotalPrice() {
    return {
      type: this.type,
      additionalFoods: this.additionalFoods,
      price: this.price.toFixed(2),
    };
  }
}

module.exports = Food;

const TYPE_DRINKS_BASE_PRICES = {
  coffee: 2,
  milk_tea: 2.25,
};

const TYPE_ADJUSTMENTS = {
  hot: 0,
  cold: 0,
  blended: 1,
};

const SIZE_ADJUSTMENTS = {
  S: 0,
  M: 0.5,
  L: 1,
  XL: 1.5,
};

const MILK_OPTION_ADJUSTMENTS = {
  none: 0,
  whole_milk: 0,
  almond_milk: 0.5,
};

const WHIPPING_CREAM_ADJUSTMENT = 0.5;

const CHOCOLATE_SAUCE_PUMP_PRICE = 0.5;
const MAX_CHOCOLATE_SAUCE_PUMPS = 6;

class Drink {
  constructor(
    drink,
    type,
    size,
    hasWhippingCream,
    milkOption,
    chocolateSaucePumps = 0
  ) {
    this.drink = drink;
    this.type = type;
    this.size = size;
    this.hasWhippingCream = hasWhippingCream;
    this.milkOption = milkOption;
    this.chocolateSaucePumps = chocolateSaucePumps;
  }

  getBasePriceByDrink() {
    if (TYPE_DRINKS_BASE_PRICES[this.drink] === undefined) {
      throw new Error(`Invalid drink: ${this.drink}`);
    }
    return TYPE_DRINKS_BASE_PRICES[this.drink];
  }

  getTypeAdjustment() {
    if (TYPE_ADJUSTMENTS[this.type] === undefined) {
      throw new Error(`Invalid drink type: ${this.type}`);
    }
    return TYPE_ADJUSTMENTS[this.type];
  }

  getSizeAdjustment() {
    if (this.size === "L" && this.type !== "cold" && this.type !== "blended") {
      throw new Error(`Invalid size for ${this.type} drink: ${this.size}`);
    }
    if (SIZE_ADJUSTMENTS[this.size] === undefined) {
      throw new Error(`Invalid drink size: ${this.size}`);
    }
    return SIZE_ADJUSTMENTS[this.size];
  }

  getWhippingCreamAdjustment() {
    return this.hasWhippingCream ? WHIPPING_CREAM_ADJUSTMENT : 0;
  }

  getMilkOptionAdjustment() {
    if (MILK_OPTION_ADJUSTMENTS[this.milkOption] === undefined) {
      throw new Error(`Invalid milk option: ${this.milkOption}`);
    }
    return MILK_OPTION_ADJUSTMENTS[this.milkOption];
  }

  getChocolateSauceAdjustment() {
    if (this.chocolateSaucePumps > 0 && this.type !== "hot") {
      throw new Error(
        `Chocolate sauce pumps cannot be added to a ${this.type} drink.`
      );
    }
    if (this.chocolateSaucePumps > MAX_CHOCOLATE_SAUCE_PUMPS) {
      throw new Error(
        `Invalid number of chocolate sauce pumps: ${this.chocolateSaucePumps}`
      );
    }
    return this.chocolateSaucePumps <= 2
      ? 0
      : (this.chocolateSaucePumps - 2) * CHOCOLATE_SAUCE_PUMP_PRICE;
  }

  getPrice() {
    const basePrice = this.getBasePriceByDrink();
    const typeAdjustment = this.getTypeAdjustment();
    const sizeAdjustment = this.getSizeAdjustment();
    const whippingCreamAdjustment = this.getWhippingCreamAdjustment();
    const milkOptionAdjustment = this.getMilkOptionAdjustment();
    const chocolateSauceAdjustment = this.getChocolateSauceAdjustment();
    return (
      basePrice +
      typeAdjustment +
      sizeAdjustment +
      whippingCreamAdjustment +
      milkOptionAdjustment +
      chocolateSauceAdjustment
    );
  }
}

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

class Food {
  constructor(type, additionalFoods) {
    this.type = type;
    this.additionalFoods = additionalFoods;
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

  getPrice() {
    const basePrice = this.getBasePrice();
    const customizationPrice = this.getCustomizationPrice();

    return basePrice + customizationPrice;
  }
}
const c = new Drink("coffee", "cold", "M", true, "none");
console.log(c.getPrice());

const food1 = new Food("sandwich", ["egg"]);
console.log(food1.getPrice());

const food2 = new Food("bagel", ["butter"]);
console.log(food2.getPrice());

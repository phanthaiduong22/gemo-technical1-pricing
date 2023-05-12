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

class MenuItem {
  constructor(price) {
    this.price = price;
  }
}

class Drink extends MenuItem {
  constructor(
    drink,
    type,
    size,
    hasWhippingCream,
    milkOption,
    chocolateSaucePumps = 0
  ) {
    super();
    this.drink = drink;
    this.type = type;
    this.size = size;
    this.hasWhippingCream = hasWhippingCream;
    this.milkOption = milkOption;
    this.chocolateSaucePumps = chocolateSaucePumps;
    this.setPrice();
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

  setPrice() {
    const basePrice = this.getBasePriceByDrink();
    const typeAdjustment = this.getTypeAdjustment();
    const sizeAdjustment = this.getSizeAdjustment();
    const whippingCreamAdjustment = this.getWhippingCreamAdjustment();
    const milkOptionAdjustment = this.getMilkOptionAdjustment();
    const chocolateSauceAdjustment = this.getChocolateSauceAdjustment();
    const totalPrice =
      basePrice +
      typeAdjustment +
      sizeAdjustment +
      whippingCreamAdjustment +
      milkOptionAdjustment +
      chocolateSauceAdjustment;
    this.price = totalPrice;
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
}

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

class Order {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  calculateTotalPrice() {
    let totalPrice = 0;
    const itemPrices = [];
    this.items.forEach((item) => {
      const itemPrice = item.price;
      itemPrices.push({ name: item.constructor.name, price: itemPrice });
      totalPrice += itemPrice;
    });
    const tax = totalPrice * 0.0725;
    totalPrice += tax;
    return { totalPrice, tax, itemPrices };
  }
}

const factory = new MenuItemFactory();
const order = new Order();

const item1 = factory.createMenuItem(
  "drink",
  "coffee",
  "cold",
  "M",
  true,
  "none"
);
order.addItem(item1);

const item2 = factory.createMenuItem("food", "sandwich", ["egg"]);
order.addItem(item2);

const item3 = new Food("bagel", ["butter"]);
order.addItem(item3);

console.log(order.calculateTotalPrice());

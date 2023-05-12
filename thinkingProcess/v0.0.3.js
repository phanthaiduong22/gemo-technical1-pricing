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
      throw new Error(`Invalid drink: ${this.type}`);
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
      throw new Error(`Invalid size for ${this.type} coffee: ${this.size}`);
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
      throw new Error(`Invalid drink milkOption: ${this.milkOption}`);
    }
    return MILK_OPTION_ADJUSTMENTS[this.milkOption];
  }

  getChocolateSauceAdjustment() {
    if (this.chocolateSaucePumps > 0 && this.type !== "hot") {
      throw new Error(
        `Type of drink is not hot when adding chocolate sauce pumps: ${this.chocolateSaucePumps}`
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

const c = new Drink("coffee", "cold", "M", true, "none");
console.log(c.getPrice());

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

class Drink {
  constructor(drink, type, size, hasWhippingCream, milkOption) {
    this.drink = drink;
    this.type = type;
    this.size = size;
    this.hasWhippingCream = hasWhippingCream;
    this.milkOption = milkOption;
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

  getPrice() {
    const basePrice = this.getBasePriceByDrink();
    const typeAdjustment = this.getTypeAdjustment();
    const sizeAdjustment = this.getSizeAdjustment();
    const whippingCreamAdjustment = this.getWhippingCreamAdjustment();
    const milkOptionAdjustment = this.getMilkOptionAdjustment();
    console.log(
      basePrice,
      typeAdjustment,
      sizeAdjustment,
      whippingCreamAdjustment,
      milkOptionAdjustment
    );
    return (
      basePrice +
      typeAdjustment +
      sizeAdjustment +
      whippingCreamAdjustment +
      milkOptionAdjustment
    );
  }
}

const c = new Drink("coffee", "cold", "M", true, "none");
console.log(c.getPrice());

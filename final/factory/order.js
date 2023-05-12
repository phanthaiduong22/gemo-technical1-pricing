class Order {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  calculateTotalPrice() {
    let totalPriceBeforeTax = 0;
    const itemPrices = [];
    this.items.forEach((item) => {
      const itemPrice = item.price;
      itemPrices.push({ name: item.constructor.name, price: itemPrice });
      totalPriceBeforeTax += itemPrice;
    });
    let tax = totalPriceBeforeTax * 0.0725;
    let totalPriceAfterTax = totalPriceBeforeTax + tax;
    return { itemPrices, totalPriceBeforeTax, tax, totalPriceAfterTax };
  }
}

module.exports = Order;

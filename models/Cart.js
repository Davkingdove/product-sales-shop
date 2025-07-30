class Cart {
  constructor() {
    this.items = [];
  }
  addItem(product, qty = 1) {
    const idx = this.items.findIndex(item => item.id === product.id);
    if (idx > -1) {
      this.items[idx].qty += qty;
    } else {
      this.items.push({ ...product, qty });
    }
  }
  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
  }
  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }
  clear() {
    this.items = [];
  }
}
module.exports = Cart;

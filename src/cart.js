function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Количество товара должно быть положительным');
  }

  const existingItem = cart.find((item) => item.id === product.id);
  const currentQuantity = existingItem ? existingItem.quantity : 0;
  const nextQuantity = currentQuantity + quantity;

  if (nextQuantity > product.stock) {
    throw new RangeError('Нельзя добавить больше товара, чем есть на складе');
  }

  if (existingItem) {
    return cart.map((item) => (item.id === product.id ? { ...item, quantity: nextQuantity } : item));
  }

  return [...cart, { ...product, quantity: nextQuantity }];
}
function changeQuantity(cart, id, quantity) {
  const item = cart.find((cartItem) => cartItem.id === id);
  if (!item) {
    return cart;
  }

  if (quantity <= 0) {
    throw new RangeError('Количество товара должно быть положительным');
  }

  if (quantity > item.stock) {
    throw new RangeError('Нельзя указать количество больше остатка на складе');
  }

  return cart.map((cartItem) => (cartItem.id === id ? { ...cartItem, quantity } : cartItem));
}
function removeFromCart(cart, id) {
  return cart.filter((item) => item.id !== id);
}
function calculateCartSubtotal(cart) {
  return cart.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
}
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;

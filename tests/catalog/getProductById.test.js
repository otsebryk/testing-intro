const products = require('../../src/data/products');
const { getProductById } = require('../../src/catalog');

describe('getProductById', () => {
  test('ID 1 - должен вернуться первый товар (products[0])', () => {
    const result = getProductById(products, 1);
    expect(result).toEqual(products[0]);
  });

  test('ID 4 - products[3]', () => {
    const result = getProductById(products, 4);
    expect(result.id).toBe(4);
    expect(result).toEqual(products[3]);
  });

  test('ID 6 - products[5], последний товар в списке', () => {
    const result = getProductById(products, 6);
    expect(result).toEqual(products[5]);
  });

  // дальше идут id, которых нет в товарах - должно вернуться null
  test('ID 0 - такого товара нет, null', () => {
    const result = getProductById(products, 0);
    expect(result).toBe(null);
  });

  test('ID 999 - тоже нет такого, null', () => {
    expect(getProductById(products, 999)).toBeNull();
  });

  test('ID -1 - отрицательных id не бывает, null', () => {
    const result = getProductById(products, -1);
    expect(result).toBe(null);
  });

  // а тут проверяю что строка '1' не считается тем же самым, что число 1
  test("ID в виде строки '1' - null, потому что это не число", () => {
    expect(getProductById(products, '1')).toBeNull();
  });

  test('ID undefined - null', () => {
    const result = getProductById(products, undefined);
    expect(result).toBe(null);
  });

  test('ID NaN - тоже null', () => {
    expect(getProductById(products, NaN)).toBeNull();
  });
});

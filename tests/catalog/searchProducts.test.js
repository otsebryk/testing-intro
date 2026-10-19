const products = require('../../src/data/products');
const { searchProducts } = require('../../src/catalog');

describe('searchProducts', () => {
  test("ищем 'Наушники' - должен найтись товар с ID 1", () => {
    const result = searchProducts(products, 'Наушники');
    // тут просто руками собираю id в массив
    const ids = [];
    for (let i = 0; i < result.length; i++) {
      ids.push(result[i].id);
    }
    expect(ids).toEqual([1]);
  });

  test("ищем 'Чистый код' - товар с ID 6", () => {
    const result = searchProducts(products, 'Чистый код');
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(6);
  });

  test("ищем 'Настольная лампа' - товар с ID 4", () => {
    const result = searchProducts(products, 'Настольная лампа');
    const ids = result.map((item) => item.id);
    expect(ids).toEqual([4]);
  });

  // дальше проверяю что регистр букв не важен для поиска
  test("'javascript' маленькими буквами всё равно находит ID 3", () => {
    const result = searchProducts(products, 'javascript');
    expect(result[0].id).toBe(3);
  });

  test("'ЧЕХОЛ' заглавными находит ID 5", () => {
    const result = searchProducts(products, 'ЧЕХОЛ');
    const ids = result.map((item) => item.id);
    expect(ids).toEqual([5]);
  });

  test("'наушники' маленькими - снова ID 1, как и в первом тесте", () => {
    const result = searchProducts(products, 'наушники');
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(1);
  });

  // пустой запрос должен вернуть вообще все товары
  test('пустая строка - все товары', () => {
    const result = searchProducts(products, '');
    const ids = result.map((item) => item.id);
    expect(ids).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('строка из одних пробелов - тоже все товары', () => {
    const result = searchProducts(products, '   ');
    expect(result.length).toBe(6);
    const ids = result.map((item) => item.id);
    expect(ids).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('табы и переносы строк - все товары', () => {
    const query = '\t\n';
    const result = searchProducts(products, query);
    expect(result).toEqual(products);
  });
});

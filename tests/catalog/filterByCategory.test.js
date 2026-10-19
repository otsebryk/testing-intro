const products = require('../../src/data/products');
const { filterByCategory } = require('../../src/catalog');

describe('filterByCategory', () => {
  test("категория 'all' - должны вернуться вообще все товары", () => {
    const result = filterByCategory(products, 'all');
    // тут просто собираю id руками через цикл, чтобы точно видеть что происходит
    const ids = [];
    for (let i = 0; i < result.length; i++) {
      ids.push(result[i].id);
    }
    expect(ids).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('если категория не передана (undefined) - тоже возвращаем все товары', () => {
    const result = filterByCategory(products, undefined);
    const ids = result.map((item) => item.id);
    expect(ids).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('пустая строка в качестве категории - все товары', () => {
    const result = filterByCategory(products, '');
    const ids = result.map((item) => item.id);
    expect(ids).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("категория 'electronics' - наушники и клавиатура", () => {
    const result = filterByCategory(products, 'electronics');
    const ids = result.map((item) => item.id);
    expect(ids).toEqual([1, 2]);
  });

  test("категория 'books'", () => {
    const result = filterByCategory(products, 'books');
    const ids = result.map((item) => item.id);
    expect(ids).toEqual([3, 6]);
  });

  test("категория 'home'", () => {
    const result = filterByCategory(products, 'home');
    const ids = result.map((item) => item.id);
    expect(ids).toEqual([4, 5]);
  });

  test("категории 'clothes' у нас в товарах нет вообще, должен быть пустой массив", () => {
    const result = filterByCategory(products, 'clothes');
    expect(result).toEqual([]);
  });

  test("'toys' - тоже несуществующая категория", () => {
    const result = filterByCategory(products, 'toys');
    // можно и так проверить, через length
    expect(result.length).toBe(0);
  });

  test("'sports' - несуществующая категория, значит пусто", () => {
    const result = filterByCategory(products, 'sports');
    expect(result).toEqual([]);
  });
});

const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
  test("сортировка всех товаров по возрастанию ('asc')", () => {
    const result = sortProductsByPrice(products, 'asc');
    const ids = [];
    for (let i = 0; i < result.length; i++) {
      ids.push(result[i].id);
    }
    expect(ids).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test('без направления сортировка тоже по возрастанию (как и с asc)', () => {
    const result = sortProductsByPrice(products);
    const ids = result.map((item) => item.id);
    expect(ids).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("часть товаров [1, 3, 4] по возрастанию", () => {
    // беру товары с нужными id в заданном порядке, как написано в задании
    const subset = products.filter((item) => item.id === 1 || item.id === 3 || item.id === 4);
    const result = sortProductsByPrice(subset, 'asc');
    expect(result.map((item) => item.id)).toEqual([3, 4, 1]);
  });

  test("все товары по убыванию ('desc')", () => {
    const result = sortProductsByPrice(products, 'desc');
    expect(result.map((item) => item.id)).toEqual([1, 2, 4, 5, 6, 3]);
  });

  test('товары [3, 1, 4] по убыванию', () => {
    const subset = products.filter(({ id }) => [3, 1, 4].includes(id));
    const result = sortProductsByPrice(subset, 'desc');
    const resultIds = result.map((p) => p.id);
    expect(resultIds).toEqual([1, 4, 3]);
  });

  test('товары [5, 2, 6] по убыванию', () => {
    const subset = products.filter(({ id }) => [5, 2, 6].includes(id));
    const result = sortProductsByPrice(subset, 'desc');
    expect(result.length).toBe(3);
    expect(result.map((p) => p.id)).toEqual([2, 5, 6]);
  });

  // проверяю что функция не портит исходный массив, который передали
  test("после сортировки 'asc' исходный массив [1, 3, 4] не поменялся", () => {
    const subset = products.filter(({ id }) => [1, 3, 4].includes(id));
    const idsBefore = subset.map((p) => p.id);
    sortProductsByPrice(subset, 'asc');
    expect(subset.map((p) => p.id)).toEqual(idsBefore);
  });

  test("после 'desc' исходный массив [1, 3, 4] тоже без изменений", () => {
    const subset = products.filter(({ id }) => [1, 3, 4].includes(id));
    sortProductsByPrice(subset, 'desc');
    expect(subset.map((p) => p.id)).toEqual([1, 3, 4]);
  });

  test('без направления исходный массив всех товаров остаётся как был', () => {
    sortProductsByPrice(products);
    // на всякий случай проверяю и длину, и сами id
    expect(products.length).toBe(6);
    expect(products.map((p) => p.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

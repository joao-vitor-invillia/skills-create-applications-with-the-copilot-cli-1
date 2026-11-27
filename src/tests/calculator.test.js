const { spawnSync } = require('child_process');
const path = require('path');
const { addition, subtraction, multiplication, division } = require('../calculator');

const CLI = path.join(__dirname, '..', 'calculator.js');
const run = (...args) => spawnSync('node', [CLI, ...args], { encoding: 'utf8' });

describe('addition', () => {
  test('2 + 3 = 5', () => expect(addition(2, 3)).toBe(5));
  test('números negativos', () => expect(addition(-2, -3)).toBe(-5));
  test('positivo e negativo', () => expect(addition(5, -8)).toBe(-3));
  test('zero é elemento neutro', () => expect(addition(7, 0)).toBe(7));
  test('decimais', () => expect(addition(0.5, 0.25)).toBe(0.75));
  test('números grandes', () => expect(addition(1e15, 1e15)).toBe(2e15));
});

describe('subtraction', () => {
  test('10 - 4 = 6', () => expect(subtraction(10, 4)).toBe(6));
  test('resultado negativo', () => expect(subtraction(4, 10)).toBe(-6));
  test('números negativos', () => expect(subtraction(-5, -3)).toBe(-2));
  test('subtrair zero', () => expect(subtraction(9, 0)).toBe(9));
  test('decimais', () => expect(subtraction(1.5, 0.5)).toBe(1));
});

describe('multiplication', () => {
  test('45 * 2 = 90', () => expect(multiplication(45, 2)).toBe(90));
  test('multiplicar por zero', () => expect(multiplication(123, 0)).toBe(0));
  test('multiplicar por um', () => expect(multiplication(7, 1)).toBe(7));
  test('sinais diferentes', () => expect(multiplication(-3, 4)).toBe(-12));
  test('dois negativos', () => expect(multiplication(-3, -4)).toBe(12));
  test('decimais', () => expect(multiplication(0.5, 0.5)).toBe(0.25));
});

describe('division', () => {
  test('20 / 5 = 4', () => expect(division(20, 5)).toBe(4));
  test('resultado decimal', () => expect(division(6, 4)).toBe(1.5));
  test('sinais diferentes', () => expect(division(-10, 2)).toBe(-5));
  test('dois negativos', () => expect(division(-10, -2)).toBe(5));
  test('zero dividido por número', () => expect(division(0, 5)).toBe(0));
  test('divisão por zero lança erro', () => {
    expect(() => division(1, 0)).toThrow('divisão por zero');
  });
  test('zero dividido por zero lança erro', () => {
    expect(() => division(0, 0)).toThrow('divisão por zero');
  });
});

describe('CLI', () => {
  test.each([
    [['add', '2', '3'], '5'],
    [['subtract', '10', '4'], '6'],
    [['multiply', '45', '2'], '90'],
    [['divide', '20', '5'], '4'],
  ])('%j imprime %s', (args, expected) => {
    const r = run(...args);
    expect(r.status).toBe(0);
    expect(r.stdout.trim()).toBe(expected);
  });

  test('divisão por zero retorna erro', () => {
    const r = run('divide', '1', '0');
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/divisão por zero/);
  });

  test('operação inválida', () => {
    const r = run('power', '2', '3');
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/operação inválida/);
  });

  test('operando não numérico', () => {
    const r = run('add', 'a', '3');
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/números válidos/);
  });

  test('argumentos ausentes mostram uso', () => {
    const r = run('add', '2');
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/Uso/);
  });
});

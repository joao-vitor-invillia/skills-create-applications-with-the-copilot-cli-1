#!/usr/bin/env node
/**
 * Calculadora CLI
 *
 * Uso: node src/calculator.js <operação> <a> [b]
 *
 * Operações suportadas:
 *   add       - addition (adição)              (a + b)
 *   subtract  - subtraction (subtração)        (a - b)
 *   multiply  - multiplication (multiplicação) (a * b)
 *   divide    - division (divisão)             (a / b); divisão por zero gera erro
 *   modulo    - remainder (módulo)             (a % b)
 *   power     - exponentiation (potência)      (a ** b)
 *   squareRoot - square root (raiz quadrada)    (√a)
 *
 * Exemplo: node src/calculator.js add 2 3  ->  5
 */

// Adição: retorna a + b
function addition(a, b) {
  return a + b;
}

// Subtração: retorna a - b
function subtraction(a, b) {
  return a - b;
}

// Multiplicação: retorna a * b
function multiplication(a, b) {
  return a * b;
}

// Divisão: retorna a / b; lança erro se b for zero
function division(a, b) {
  if (b === 0) {
    throw new Error('Erro: divisão por zero não é permitida.');
  }
  return a / b;
}

// Módulo: retorna o resto de a / b
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Erro: módulo por zero não é permitido.');
  }
  return a % b;
}

// Potência: retorna base elevada a exponent
function power(base, exponent) {
  return base ** exponent;
}

// Raiz quadrada: lança erro para números negativos
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Erro: não é possível calcular a raiz quadrada de um número negativo.');
  }
  return Math.sqrt(n);
}

// Mapeia os comandos da CLI para as funções
const operations = {
  add: addition,
  subtract: subtraction,
  multiply: multiplication,
  divide: division,
  modulo,
  power,
  squareRoot,
};

function main(argv) {
  const [op, rawA, rawB] = argv;
  const isUnaryOperation = op === 'squareRoot';

  if (!op || rawA === undefined || (!isUnaryOperation && rawB === undefined)) {
    console.error('Uso: node calculator.js <add|subtract|multiply|divide|modulo|power> <a> <b> ou <squareRoot> <n>');
    return 1;
  }

  if (!Object.hasOwn(operations, op)) {
    console.error(`Erro: operação inválida "${op}". Use add, subtract, multiply, divide, modulo, power ou squareRoot.`);
    return 1;
  }

  const a = Number(rawA);
  const b = isUnaryOperation ? undefined : Number(rawB);
  if (
    rawA.trim() === ''
    || !Number.isFinite(a)
    || (!isUnaryOperation && (rawB.trim() === '' || !Number.isFinite(b)))
  ) {
    console.error('Erro: os operandos devem ser números válidos.');
    return 1;
  }

  try {
    console.log(isUnaryOperation ? operations[op](a) : operations[op](a, b));
    return 0;
  } catch (err) {
    console.error(err.message);
    return 1;
  }
}

if (require.main === module) {
  process.exitCode = main(process.argv.slice(2));
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
};

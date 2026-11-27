#!/usr/bin/env node
/**
 * Calculadora CLI
 *
 * Uso: node src/calculator.js <operação> <a> <b>
 *
 * Operações suportadas:
 *   add       - addition (adição)              (a + b)
 *   subtract  - subtraction (subtração)        (a - b)
 *   multiply  - multiplication (multiplicação) (a * b)
 *   divide    - division (divisão)             (a / b); divisão por zero gera erro
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

// Mapeia os comandos da CLI para as funções
const operations = {
  add: addition,
  subtract: subtraction,
  multiply: multiplication,
  divide: division,
};

function main(argv) {
  const [op, rawA, rawB] = argv;

  if (!op || rawA === undefined || rawB === undefined) {
    console.error('Uso: node calculator.js <add|subtract|multiply|divide> <a> <b>');
    return 1;
  }

  if (!Object.hasOwn(operations, op)) {
    console.error(`Erro: operação inválida "${op}". Use add, subtract, multiply ou divide.`);
    return 1;
  }

  const a = Number(rawA);
  const b = Number(rawB);
  if (rawA.trim() === '' || rawB.trim() === '' || !Number.isFinite(a) || !Number.isFinite(b)) {
    console.error('Erro: os operandos devem ser números válidos.');
    return 1;
  }

  try {
    console.log(operations[op](a, b));
    return 0;
  } catch (err) {
    console.error(err.message);
    return 1;
  }
}

if (require.main === module) {
  process.exitCode = main(process.argv.slice(2));
}

module.exports = { addition, subtraction, multiplication, division };

//  Создайте функцию, которая в качестве аргумента будет принимать имя, а возвращать строчку ‘Hello “аргумент функции”’.

function greet(name) {
    return `Hello, "${name}"`;
}

console.log(greet("Christina"));

// Создайте массив чисел, далее создайте функцию, которая будет принимать в качестве аргумента массив чисел. Функция должна перебирать 
// полученный массив и если число больше 10 - выводить это число в консоль.

const numbers = [5, 15, 8, 22, 2]

function checkNumbers(numbers) {
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > 10) {
            console.log(numbers[i]);
        }
    }
}

checkNumbers(numbers);

// Предлагаю вам реализовать простенький калькулятор. Создайте функцию, которая будет принимать три аргумента, два числа и строку для выбора
//  оператора. При вызове функции пользователь передает, например, (2, 3, ‘minus’), внутри функции происходит проверка на знак и в данном случае 
// функция должна вернуть -1. То есть мы получаем разницу между первым и вторым аргументом. Запишите результат выполнения функции в переменную
//  и выведите в консоль. Подобным образом реализуйте 4 математические операции: сложение, вычитание, умножение и деление.

function calc(number1, number2, operator) {
    if (operator == 'plus') {
        return number1 + number2
    } else if (operator == 'minus') {
        return number1 - number2
    } else if (operator == 'multiplication') {
        return number1 * number2
    } else if (operator == 'division') {
        if (number2 !== 0) {
            return number1 / number2;
        } else {
            return 'Ошибка: деление на 0';
        }
    }
}

let result = calc(10, 5, 'minus');
console.log(result);
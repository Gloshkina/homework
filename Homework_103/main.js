// Создайте объект с вашим описанием(имя, возраст и т.д.).
// Создайте метод объекта, который в качестве аргумента будет принимать имя и возвращать строку ‘Hello “переданный аргумент”’.

const user = {
    name: 'Christina',
    age: 20,
    hobby: 'drawing',
    greet: function (friendName) {
        return `Hello "${user.name}"`;
    }
}

console.log(user.greet())


// Создайте массив объектов с описанием пользователей(такой мы делали в уроке). Объявите отдельную переменную, в которой будет храниться 
// количество простых пользователей, начальное значение будет - 0. Обойдите массив пользователей и если пользователь не является 
// админом - прибавьте к ранее созданной переменной единицу. После окончания работы цикла выведите в консоль переменную с количеством 
// простых пользователей.

const users = [
    {
        name: 'Ivan',
        age: 30,
        isAdmin: false
    },
    {
        name: 'Gosha',
        age: 32,
        isAdmin: true
    },
    {
        name: 'Maria',
        age: 25,
        isAdmin: false
    }


]

let simpleUsersCount = 0;

for (let i = 0; i < users.length; i++) {
    if (users[i].isAdmin === false) {
        simpleUsersCount++;
    }
}

console.log(simpleUsersCount);
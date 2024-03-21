// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

function createAppTitle() {
    let appTitle = document.createElement('h1');
    appTitle.textContent = 'Панель управления студентами';
    return appTitle;
}

StudentsControlPanel = createAppTitle();

let container = document.getElementById('container');
StudentsControlPanel.setAttribute('style', 'text-align: center;');
StudentsControlPanel.classList.add('h1');
container.prepend(StudentsControlPanel);

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.

const studentsArray = [
    {
        surname: 'Дарк',
        name: 'Жанна',
        middlename: 'Петрова',
        faculty: 'Исторический',
        birthday: '1979-01-01',
        started: 2024
    }, 
    {
        surname: 'Волков',
        name: 'Борис',
        middlename: 'Иванович',
        faculty: 'Строительство',
        birthday: '2002-03-11',
        started: 2022
    }, 
    {
        surname: 'Люлин',
        name: 'Никита',
        middlename: 'Сергеевич',
        faculty: 'Управление проектами',
        birthday: '1982-06-10',
        started: 2023
    }, 
    {
        surname: 'Попков',
        name: 'Евгений',
        middlename: 'Юрьевич',
        faculty: 'Техническая поддержка',
        birthday: '1996-09-08',
        started: 2019
    }, 
    {
        surname: 'Агеева',
        name: 'Екатерина',
        middlename: 'Владимировна',
        faculty: 'Бизнес партнерство',
        birthday: '2007-05-21',
        started: 2021
    }
]

let tableStudentsArray = [];

// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

function getStudentItem(studentObj) {
    
    let newStudentObj = {};
    let fullName = '';
    for (let value in studentObj) {

        if (value == 'surname') {
            fullName = studentObj[value];
        } else if (value == 'name') {
            fullName += ` ${studentObj[value]}`;
        } else if (value == 'middlename') {
            fullName += ` ${studentObj[value]}`;
            newStudentObj.name = fullName;
        } else newStudentObj[value] = studentObj[value];
        
        
    }

    let studentAge = Math.floor((new Date() - new Date(newStudentObj.birthday)) / 31557600000);
    let yearOfEnding = Number(newStudentObj.started) + 4;
    let currentMonth = new Date().getMonth() + 1;
    let course = new Date().getFullYear() - Number(newStudentObj.started);
    
    if (course > 0 && course <= 4 && currentMonth < 9) {
        newStudentObj.started += ` - ${yearOfEnding} (${course} курс)`;
    } else if (course === 0 && currentMonth < 9) {
        newStudentObj.started += ` - ${yearOfEnding} (1 курс)`;
    } else if (course > 4 || (course === 4 && currentMonth > 9)) {
        newStudentObj.started += ` - ${yearOfEnding} (закончил)`;
    }

    newStudentObj.birthday += `(${studentAge} лет)`;

        tbodyRef = document.getElementById('students-table').getElementsByTagName('tbody')[0];

        let arrayOfValue = Object.values(newStudentObj);
        let newRow = tbodyRef.insertRow();
        newRow.classList.add('table-secondary');

                for (let i = 0; i < arrayOfValue.length; i++) {
                    let newCell = newRow.insertCell();
                    if (i === 0) {
                        newCell.setAttribute("colspan", "3");
                    }
                    let newCellText = document.createTextNode(arrayOfValue[i]);
                    newCell.appendChild(newCellText);
                }
    tableStudentsArray.push(newStudentObj);
    console.log(tableStudentsArray);
    return tableStudentsArray;              
}



// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.

function renderStudentsTable(studentsArray) {
    tableStudentsArray = [];
    let e = document.getElementById('studentsTable-tbody');
            while ( e.rows[0] ) {
                    e.deleteRow(0);
            };

    for (let i = 0; i < studentsArray.length; i++) {
        studentObj = studentsArray[i];
        getStudentItem(studentObj);
    } 
}
renderStudentsTable(studentsArray);

// Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.

let inputForm = document.getElementById('inputForm');

inputForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let inputElements = document.getElementsByTagName('input');
        for (let i=0; i < inputElements.length; i++) {
            if (inputElements[i].type === 'text' && inputElements[i].value.trim() === '') {
                alert(`Заполните все поля`);
               return; 
            } else if (inputElements[i].type === 'date' && i === 4 && (new Date(inputElements[i].value).getTime() < new Date ('1900-01-01').getTime() || new Date(inputElements[i].value).getTime() > Date.now())) {
                alert(`Введите корректную дату рождения`);
                return;
            } else if (inputElements[i].type === 'number' && i === 5 && (inputElements[i].value < 2000 || inputElements[i].value > new Date().getFullYear())) {
                alert(`Введите корректный год поступления`);
                return;
            }
        }
    
    const data = new FormData(inputForm);
    let newStudentObj = Object.fromEntries(data);

    studentsArray.push(newStudentObj);
    renderStudentsTable(studentsArray);
    
        for (let i=0; i < inputElements.length; i++) {
            if (inputElements[i].type != 'submit') {
                inputElements[i].value = '';
            }
        }
        console.log(studentsArray);
});

// Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.
let dir = false;
let sortProp = "";
const sortStudentsArray = (arr, prop, dir) => arr.sort((a,b) => (!dir ? a[prop] < b[prop] : a[prop] > b[prop]) ? -1 : 0);

console.log(sortStudentsArray(studentsArray, 'name', dir));

const headerSort = document.getElementsByTagName('th');
for (let i = 0; i < headerSort.length; i++) {
    headerSort[i].addEventListener('click', tableSort);  
}

function tableSort(e) {
    console.log(e.target.id);
    if (sortProp === e.target.id) {
        dir = !dir;
    } 
    sortStudentsArray(studentsArray, e.target.id, dir);
    console.log(studentsArray);
    renderStudentsTable(studentsArray);
    sortProp = e.target.id;
}

// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.
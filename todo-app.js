(function() {

    let arrayOfCases = [];

    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }


function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    button.disabled = true;

    

    return {
        form,
        input,
        button
    };
}


function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
}


function createTodoApp(container, title = 'Список дел', userKey) {

    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    let arrayOfCases = loadDataFromLocalStorage(userKey);
    
    if (arrayOfCases) {
        console.log(arrayOfCases);
        for (let value of arrayOfCases) {
            let todoItem = createTodoItem(value);
            todoList.append(todoItem.item);
            value.done ? todoItem.item.classList.add('list-group-item-success') : null;
        }
    }
    



    todoItemForm.input.addEventListener("input", function(){
    !todoItemForm.input.value ? todoItemForm.button.disabled = true : todoItemForm.button.disabled = false; 
    })

    
    todoItemForm.form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!todoItemForm.input.value) {
            return;
        }
        
        let maxId = -1;
        for (let value of arrayOfCases) {
            value.id > maxId ? maxId = value.id : maxId;   
        }

        let itemObj = {
                        id: maxId + 1,
                        name: todoItemForm.input.value,
                        done: false
                       };

        let todoItem = createTodoItem(itemObj);

        todoItem.doneButton.addEventListener('click', function() {
            todoItem.item.classList.toggle('list-group-item-success');

          
                        for (let value of arrayOfCases) {
                            if (value.id === itemObj.id) { 
                                let doneIndex = arrayOfCases.indexOf(value);
                                arrayOfCases[doneIndex].done = !arrayOfCases[doneIndex].done;
                                console.log(arrayOfCases);
                                } else continue; 
                        }
            saveDataToLocalStorage(userKey, arrayOfCases);
            return arrayOfCases;
        });

        todoItem.deleteButton.addEventListener('click', function() {
            if (confirm('Вы уверены?')) {
                
                
                        for (let value of arrayOfCases) {
                            if (value.id === itemObj.id) {
                                let delIndex = arrayOfCases.indexOf(value);
                                arrayOfCases.splice(delIndex, 1);
                            } else continue; 
                            }
                            console.log(arrayOfCases);
                todoItem.item.remove();
            }
            saveDataToLocalStorage(userKey, arrayOfCases);
            return arrayOfCases;
            
        });

        todoList.append(todoItem.item);
        arrayOfCases.push(itemObj);
        console.log(arrayOfCases);

        saveDataToLocalStorage(userKey, arrayOfCases);
        

        todoItemForm.input.value = '';
        todoItemForm.button.disabled = true;
        
        return arrayOfCases;

    });
}

function saveDataToLocalStorage(userKey, userData) {
    localStorage.setItem(userKey, JSON.stringify(userData));
}

function loadDataFromLocalStorage(userKey) {
    return JSON.parse(localStorage.getItem(userKey));
}


    window.createTodoApp = createTodoApp;
})();



function createTodoItem(itemObj) {

    let {id, name, done} = itemObj;

    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
        item,
        doneButton,
        deleteButton
    };
}
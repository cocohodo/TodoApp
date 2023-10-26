const list = document.getElementById('list');
const createButton = document.getElementById('create-button');
let todos = [];

createButton.onclick = createNewTodo;

function createNewTodo() {
    //새로운 투두 객체 생성
    const item = {id:new Date().getTime(), text:'', complete:false}
    //배열 처음에 첫 요소 삽입
    todos.unshift(item);
    //요소 생성하기
    const {itemElement, inputElement, editButtonElement, removeButtonElement} = createTodoElement(item);

    //리스트 요소 안에 방금 생성한 아이템 요소 추가
    list.prepend(itemElement);
    inputElement.removeAttribute('disabled');
    inputElement.focus();
    saveToLocalStorage();
}

function createTodoElement(item) {
    const itemElement = document.createElement('div');
    itemElement.classList.add('item');
    if(item.complete) {
        itemElement.classList.add('complete');
    }

    const checkboxElement = document.createElement('input');
    checkboxElement.type = 'checkbox';
    checkboxElement.checked = item.complete;
    checkboxElement.addEventListener('change', () => {
        item.complete = checkboxElement.checked;

        if(item.complete) {
            itemElement.classList.add('complete');
            saveToLocalStorage();
        }
        else {
            itemElement.classList.remove('complete');
            saveToLocalStorage();
        }
    })

    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = item.text;
    inputElement.setAttribute('disabled','');
    inputElement.addEventListener('input', () => {
        item.text = inputElement.value;
    });
    inputElement.addEventListener('blur', () => {
        inputElement.setAttribute('disabled','');
        saveToLocalStorage();
    })

    const actionsElement = document.createElement('div');
    actionsElement.classList.add('actions');

    const editButtonElement = document.createElement('button');
    editButtonElement.classList.add('material-icons');
    editButtonElement.innerText = 'edit';
    editButtonElement.addEventListener('click', () => {
        inputElement.removeAttribute('disabled');
        inputElement.focus();
    })

    const removeButtonElement = document.createElement('button');
    removeButtonElement.classList.add('material-icons','remove-button');
    removeButtonElement.innerText = 'remove_circles';
    removeButtonElement.addEventListener('click', () => {
        //아이디 같은 것은 필터에 걸리고 나머지 요소로만 배열 반환
        todos = todos.filter(t => t.id !== item.id);
        itemElement.remove();
        saveToLocalStorage();
    })

    actionsElement.append(editButtonElement);
    actionsElement.append(removeButtonElement);

    itemElement.append(checkboxElement);
    itemElement.append(inputElement);
    itemElement.append(actionsElement);

    return {itemElement, inputElement, editButtonElement, removeButtonElement};
}

function saveToLocalStorage() {
    const data = JSON.stringify(todos);
    window.localStorage.setItem('my_todos', data);
}

function loadFromLocalStorage() {
    const data = localStorage.getItem('my_todos');
    if(data) {
        todos = JSON.parse(data);
    }
}
function displayTodos() {
    loadFromLocalStorage();

    for(let i = 0; i < todos.length; i++) {
        const item = todos[i];
        //반환하는 요소가 4개니까 object로 받고 itemElement로 이름 지정
        const {itemElement} = createTodoElement(item);
        list.append(itemElement);
    }
}
displayTodos();
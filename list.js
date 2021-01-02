const toDoForm = document.querySelector(".toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".toDoList"),
    doneList = document.querySelector(".doneList");

const TODOS_LS = 'toDos';

const toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const checkBtn = document.createElement("button");
    checkBtn.innerText= "✓";
    const span = document.createElement("span");
    span.innerText = text;
    const delBtn = document.createElement("button");
    delBtn.innerText ="✗";
    const newId = toDos.length+1;

    li.appendChild(checkBtn);
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);

    li.id = newId;

    const toDoObj = {
        text:text,
        id:newId
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){ 
        console.log(loadedToDos);
        const parsedToDos = JSON.parse(loadedToDos);
        console.log(parsedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }
};

function init() {
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
};
init();
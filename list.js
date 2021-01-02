const toDoForm = document.querySelector(".toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".toDoList"),
    doneList = document.querySelector(".doneList");

const TODOS_LS = 'toDos';
const DONE_LS = 'dones';

let toDos = [];
let dones = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    const cleanToDos = toDos.filter(function(toDo){
        console.log(toDo.id, li.id);
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos(TODOS_LS, toDos);
}
function deleteDones(event) {
    const btn = event.target;
    const li = btn.parentNode;
    doneList.removeChild(li);
    
    const cleanDones = dones.filter(function(done){
        return done.id !== parseInt(li.id);
    });
    dones = cleanDones;
    saveToDos(DONE_LS, dones);
}

function doneToDo(event){
    const btn=event.target;
    const li =btn.parentNode;
    const doneId = li.id;
    console.log(doneId);

    const doneText = li.querySelector("span").innerText;

    doneList.appendChild(li);

    const doneObj = {
        text:doneText,
        id:doneId
    }
    dones.push(doneObj);
    saveToDos(DONE_LS , dones);
    console.log(doneObj);

    toDos.splice(doneId - 1,1);
    saveToDos(TODOS_LS, toDos);
}

function saveToDos(ls,lsName) {
    localStorage.setItem(ls, JSON.stringify(lsName));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const newId = toDos.length+1;
    const checkBtn = document.createElement("button");
    checkBtn.innerText= "✓";
    checkBtn.addEventListener("click",doneToDo);

    const span = document.createElement("span");
    span.innerText = text;
    const delBtn = document.createElement("button");
    delBtn.innerText ="✗";
    delBtn.addEventListener("click",deleteToDo);

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
    saveToDos(TODOS_LS, toDos);
}

function paintDone(text) {
    const li = document.createElement("li");
    const newId = dones.length+1;
    const checkBtn = document.createElement("button");
    checkBtn.innerText= "✓";
    // checkBtn.addEventListener("click",doneToDo);

    const span = document.createElement("span");
    span.innerText = text;
    const delBtn = document.createElement("button");
    delBtn.innerText ="✗";
    delBtn.addEventListener("click",deleteDones);

    li.appendChild(checkBtn);
    li.appendChild(span);
    li.appendChild(delBtn);
    doneList.appendChild(li);

    li.id = newId;

    const doneObj = {
        text:text,
        id:newId
    }
    dones.push(doneObj);
    saveToDos(DONE_LS, dones);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
    // paintDone(currentValue);
    // toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    const loadedDones = localStorage.getItem(DONE_LS);

    if(loadedToDos !== null){ 
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }
    if(loadedDones !== null){ 
        const parsedDones = JSON.parse(loadedDones);
        parsedDones.forEach(function(done){
            paintDone(done.text);
        })
    }
};

function init() {
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
};
init();
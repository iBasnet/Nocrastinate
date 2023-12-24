///////////////////////-DARK-MODE-///////////////////////

let isInverted = false;

function toggleBackground() {
    const body = document.body;
    const todoAdd = document.querySelector('.todo-add');
    const emojis = document.querySelectorAll('.emoji');

    if (isInverted) {
        body.style.backgroundColor = "#070A13";
        body.style.filter = 'none';
        isInverted = false;

        // Reset the filter for the .todo-add class
        if (todoAdd) {
            todoAdd.style.filter = 'none';
        }

        // Reset the filter for elements with .emoji class
        emojis.forEach(emoji => {
            emoji.style.filter = 'none';
        });

    } else {
        body.style.backgroundColor = "#F1F5F9";
        body.style.filter = 'invert(100%)';
        isInverted = true;

        // Reapply the invert filter for the .todo-add class
        if (todoAdd) {
            todoAdd.style.filter = 'invert(100%)';
        }

        // Exclude elements with .emoji class from the invert filter
        emojis.forEach(emoji => {
            emoji.style.filter = 'invert(100%)';
        });
    }
}

/////////////////////-GREETINGS-///////////////////////

document.addEventListener('DOMContentLoaded', () => {
    const greeting = document.getElementById('greeting');

    // Function to get the current time and update the greeting
    function updateGreeting() {
        const currentTime = new Date().getHours();

        if (currentTime >= 5 && currentTime < 12) {
            greeting.innerHTML = 'Good, Morning! <span class="emoji">☀️</span>';
        } else if (currentTime >= 12 && currentTime < 18) {
            greeting.innerHTML = 'Good, Afternoon! <span class="emoji">🌤️</span>';
        } else {
            greeting.innerHTML = 'Good, Evening! <span class="emoji">🌙</span>';
        }
    }

    // Call the function initially to set the greeting based on the current time
    updateGreeting();

    // Update the greeting every minute to reflect the current time
    setInterval(updateGreeting, 60000); // Update every minute
});


/////////////////////TODO-BAR-LOCAL-STORAGE////////////////////////////

// Event listeners to save text in local storage when input changes
document.addEventListener('input', function (event) {
    if (event.target.closest('.todo-bar-1') && event.target.classList.contains('todo')) {
        localStorage.setItem('todoBar1_' + event.target.id, event.target.value);
    }
    if (event.target.closest('.todo-bar-2') && event.target.classList.contains('todo')) {
        localStorage.setItem('todoBar2_' + event.target.id, event.target.value);
    }
});

// Function to load saved text from local storage on page load
document.addEventListener('DOMContentLoaded', function () {
    loadTextFromLocalStorage();
});

// Load saved text from local storage and set in the input fields
function loadTextFromLocalStorage() {
    const todoInputs1 = document.querySelectorAll('.todo-bar-1 .todo');
    todoInputs1.forEach(input => {
        const savedText = localStorage.getItem('todoBar1_' + input.id);
        if (savedText !== null) {
            input.value = savedText;
        }
    });

    const todoInputs2 = document.querySelectorAll('.todo-bar-2 .todo');
    todoInputs2.forEach(input => {
        const savedText = localStorage.getItem('todoBar2_' + input.id);
        if (savedText !== null) {
            input.value = savedText;
        }
    });
}

// Functions related to displaying tasks
window.onload = function () {
    displayTasks();
}
// Code for displaying tasks from localStorage
function displayTasks() {
    const taskSection = document.querySelector('.buttons');

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const todoBar = createTodoBar(task.text, task.checked);
        taskSection.appendChild(todoBar);
    });
}

// Code for creating a task element
function createTodoBar(taskText, checked) {
    const todoBar = document.createElement('div');
    todoBar.classList.add('todo-bar');

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', "What's on your mind?");
    input.setAttribute('spellcheck', 'false');
    input.classList.add('todo');
    input.value = taskText;

    if (checked) {
        input.style.textDecoration = 'line-through';
    }

    const checkBtn = document.createElement('button');
    checkBtn.classList.add('btn', 'check-btn');
    checkBtn.onclick = function () {
        if (input.style.textDecoration === 'line-through') {
            input.style.textDecoration = 'none';
            updateTaskStatus(taskText, false);
            decreaseBarHeight();
        } else {
            input.style.textDecoration = 'line-through';
            updateTaskStatus(taskText, true);
            increaseBarHeight();
        }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'delete-btn');
    deleteBtn.onclick = function () {
        if (input.style.textDecoration === 'line-through') {
            // Remove the todo element when the text is line-through (checked)
            todoBar.remove();
            removeTask(taskText);
        } else {
            // If text is not line-through, call decreaseBarHeight and remove the todo element
            decreaseBarHeight();
            todoBar.remove();
            removeTask(taskText);
        }
    };

    todoBar.appendChild(input);
    todoBar.appendChild(checkBtn);
    todoBar.appendChild(deleteBtn);

    return todoBar;
}


// Code for removing a task from localStorage
function removeTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Code for updating the status of a task in localStorage
function updateTaskStatus(taskText, checked) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.map(task => {
        if (task.text === taskText) {
            return { text: task.text, checked: checked };
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function addTask() {
    const add = document.getElementsByClassName('todo-add')[0];
    const inputValue = add.querySelector('input').value.trim();

    if (inputValue === '') {
        alert_error();
    } else {
        alert_success();
        const taskSection = document.querySelector('.buttons');
        const todoBar = createTodoBar(inputValue, false);

        taskSection.appendChild(todoBar);

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: inputValue, checked: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));

        add.querySelector('input').value = '';
    }
}

//////////////////////////////////////////////////////////////////////////

// Functions related to toast notifications
let notifications = document.querySelector('.notifications');
let success = document.getElementById('success');
let error = document.getElementById('error');
let warning = document.getElementById('warning');
let info = document.getElementById('info');

// Code for creating toast notifications
function createToast(type, icon, title, text) {
    let newToast = document.createElement('div');
    newToast.innerHTML = `
            <div class="toast ${type}">
                <i class="${icon}"></i>
                <div class="content">
                    <div class="title">${title}</div>
                    <span>${text}</span>
                </div>
                <i class="fa-solid fa-xmark" onclick="(this.parentElement).remove()"></i>
            </div>`;
    notifications.appendChild(newToast);
    newToast.timeOut = setTimeout(
        () => newToast.remove(), 3000
    )
}

// Code for success toast notification
function alert_success() {
    let type = 'success';
    let icon = 'fa-solid fa-circle-check';
    let title = 'Task Added!';
    let text = 'Now Accomplish Them!';
    createToast(type, icon, title, text);
}

function alert_timer_added() {
    let type = 'success';
    let icon = 'fa-solid fa-circle-check';
    let title = 'Timer Added!';
    // let text = 'The Timer has been added!';
    let text = '';
    createToast(type, icon, title, text);
}

function alert_alarm_added() {
    let type = 'success';
    let icon = 'fa-solid fa-circle-check';
    let title = 'Alarm Added!';
    // let text = 'The Alarm has been added!';
    let text = '';
    createToast(type, icon, title, text);
}

// Code for error toast notification
function alert_error() {
    let type = 'error';
    let icon = 'fa-solid fa-circle-exclamation';
    let title = 'Empty Input.';
    let text = 'Please add something.';
    createToast(type, icon, title, text);
}

// Code for error toast notification
function alert_info() {
    let type = 'info';
    let icon = 'fa-solid fa-circle-info';
    let title = 'Time Up!';
    // let text = 'The settled time has reached!';
    let text = '';
    createToast(type, icon, title, text);
}

function alert_info_timer() {
    let type = 'info';
    let icon = 'fa-solid fa-circle-info';
    let title = 'Time Up!';
    // let text = 'The settled time has reached!';
    let text = '';
    createToast(type, icon, title, text);
}

function alert_info_alarm() {
    let type = 'info';
    let icon = 'fa-solid fa-circle-info';
    let title = 'Time Up!';
    // let text = 'The settled time has reached!';
    let text = '';
    createToast(type, icon, title, text);
}
// function for warning toast
function alert_warning() {
    let type = 'warning';
    let icon = 'fa-solid fa-triangle-exclamation';
    let title = 'Elapsed Time!';
    // let text = 'Please enter a future time.';
    let text = '';
    createToast(type, icon, title, text);
}

// Code for success toast onclick
success.onclick = function () {
    let type = 'success';
    let icon = 'fa-solid fa-circle-check';
    let title = 'Task Added!';
    let text = 'Now accomplish them.';
    createToast(type, icon, title, text);
}

error.onclick = function () {
    let type = 'error';
    let icon = 'fa-solid fa-circle-exclamation';
    let title = 'Error';
    let text = 'This is a error toast.';
    createToast(type, icon, title, text);
}

warning.onclick = function () {
    let type = 'warning';
    let icon = 'fa-solid fa-triangle-exclamation';
    let title = 'Warning';
    let text = 'This is a warning toast.';
    createToast(type, icon, title, text);
}

info.onclick = function () {
    let type = 'info';
    let icon = 'fa-solid fa-circle-info';
    let title = 'Info';
    let text = 'This is a info toast.';
    createToast(type, icon, title, text);
}

////////////////////////222222222222222222222222222222222//////////////////////

function toggleTT() {
    var ttArea = document.querySelector('.tt-area');
    if (ttArea.style.display === 'none' || ttArea.style.display === '') {
        ttArea.style.display = 'block';
    } else {
        ttArea.style.display = 'none';
    }
}
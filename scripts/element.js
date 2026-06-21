const todoList = document.getElementById('todoList');
const checkCircle = document.querySelector('.check-circle');
const newTodoInput = document.getElementById('newTodoInput');
const itemsLeftEl = document.getElementById('itemsLeft');
const clearCompletedBtn = document.getElementById('clearCompleted');
const themeToggle = document.getElementById('themeToggle');
const filterBtns = document.querySelectorAll('.filter-btn');
const STORAGE_KEY = 'todo-app-items-v1';
const THEME_KEY = 'todo-app-theme-v1';

export {
  STORAGE_KEY,
  THEME_KEY,
  checkCircle,
  clearCompletedBtn,
  filterBtns,
  itemsLeftEl,
  newTodoInput,
  themeToggle,
  todoList,
};

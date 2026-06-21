import { checkCircle, clearCompletedBtn, filterBtns, newTodoInput, THEME_KEY, themeToggle } from './element';
import { addTodo, clearCompleted, setFilter, setTheme } from './function';

const addEvent = () => {
  checkCircle.addEventListener('click', () => {
    addTodo(newTodoInput.value);
    newTodoInput.value = '';
  });
  newTodoInput.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    addTodo(newTodoInput.value);
    newTodoInput.value = '';
  });

  clearCompletedBtn.addEventListener('click', clearCompleted);

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => setFilter(btn.dataset.filter));
  });

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
  
  setTheme(localStorage.getItem(THEME_KEY) || 'light');

};

export default addEvent;
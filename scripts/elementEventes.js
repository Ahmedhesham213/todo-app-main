import { checkCircle, filterBtns, newTodoInput, THEME_KEY, themeToggle } from './element';
import { addTodo, setFilter, setTheme } from './function';

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

  checkCircle.addEventListener('click', () => {
    addTodo(newTodoInput.value);
    newTodoInput.value = '';
  });

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

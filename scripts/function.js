import { filterBtns, itemsLeftEl, STORAGE_KEY, THEME_KEY, todoList } from './element';

const defaultTodos = [
  { id: makeId(), text: 'Complete online JavaScript course', completed: true },
  { id: makeId(), text: 'Jog around the park 3x', completed: false },
  { id: makeId(), text: '10 minutes meditation', completed: false },
  { id: makeId(), text: 'Read for 1 hour', completed: false },
  { id: makeId(), text: 'Pick up groceries', completed: false },
  { id: makeId(), text: 'Complete Todo App on Frontend Mentor', completed: false },
];

let todos = readTodos();
let currentFilter = 'all';
let dragSrcId = null;

function makeId() {
  return 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function readTodos() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultTodos;
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) && parsed.length ? parsed : defaultTodos;
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

function getVisibleTodos() {
  if (currentFilter === 'active') return todos.filter((t) => !t.completed);
  if (currentFilter === 'completed') return todos.filter((t) => t.completed);
  return todos;
}

function buildTodoItem(todo) {
  const li = document.createElement('li');
  li.className = 'todo-item' + (todo.completed ? ' completed' : '');
  li.draggable = true;
  li.dataset.id = todo.id;

  const checkBtn = document.createElement('button');
  checkBtn.type = 'button';
  checkBtn.className =
    'check-circle ' + (todo.completed ? 'check-circle--checked' : 'check-circle--empty');
  checkBtn.setAttribute(
    'aria-label',
    todo.completed ? 'Mark as not completed' : 'Mark as completed'
  );
  checkBtn.innerHTML = todo.completed ? '<img src="../images/icon-check.svg" alt="" />' : '';
  checkBtn.onclick = () => toggleComplete(todo.id);

  const text = document.createElement('span');
  text.className = 'todo-text';
  text.textContent = todo.text;

  const delBtn = document.createElement('button');
  delBtn.type = 'button';
  delBtn.className = 'todo-delete';
  delBtn.setAttribute('aria-label', 'Delete todo');
  delBtn.innerHTML = '<img src="../images/icon-cross.svg" alt="icon" />';
  delBtn.onclick = () => deleteTodo(todo.id);

  li.append(checkBtn, text, delBtn);
  attachDragHandlers(li);
  return li;
}

function render() {
  todoList.innerHTML = '';
  getVisibleTodos().forEach((todo) => todoList.appendChild(buildTodoItem(todo)));

  const remaining = todos.filter((t) => !t.completed).length;
  itemsLeftEl.textContent = `${remaining} ${remaining === 1 ? 'item' : 'items'} left`;

  filterBtns.forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.filter === currentFilter);
  });
}

function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  todos.unshift({ id: makeId(), text: trimmed, completed: false });
  saveTodos();
  render();
}

function toggleComplete(id) {
  todos = todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
  saveTodos();
  render();
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
  render();
}

function clearCompleted() {
  todos = todos.filter((t) => !t.completed);
  saveTodos();
  render();
}

function setFilter(filter) {
  currentFilter = filter;
  render();
}

function attachDragHandlers(li) {
  li.addEventListener('dragstart', () => {
    dragSrcId = li.dataset.id;
    li.classList.add('dragging');
  });

  li.addEventListener('dragend', () => {
    li.classList.remove('dragging');
    document.querySelectorAll('.drag-over').forEach((el) => el.classList.remove('drag-over'));
  });

  li.addEventListener('dragover', (e) => {
    e.preventDefault();
    if (li.dataset.id !== dragSrcId) li.classList.add('drag-over');
  });

  li.addEventListener('dragleave', () => li.classList.remove('drag-over'));

  li.addEventListener('drop', (e) => {
    e.preventDefault();
    li.classList.remove('drag-over');
    const targetId = li.dataset.id;
    if (!dragSrcId || dragSrcId === targetId) return;

    const srcIndex = todos.findIndex((t) => t.id === dragSrcId);
    const targetIndex = todos.findIndex((t) => t.id === targetId);
    if (srcIndex === -1 || targetIndex === -1) return;

    const [moved] = todos.splice(srcIndex, 1);
    todos.splice(targetIndex, 0, moved);
    saveTodos();
    render();
  });
}

export {
  addTodo,
  attachDragHandlers,
  clearCompleted,
  defaultTodos,
  deleteTodo,
  render,
  saveTodos,
  setFilter,
  setTheme,
  toggleComplete,
};

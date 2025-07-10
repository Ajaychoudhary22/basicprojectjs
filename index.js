addEventListener('DOMContentLoaded', () => {
   const todoInput = document.getElementById('todo-input');
   const addbutton = document.getElementById('add');
   const todotask = document.getElementById('todo-list');

   let task = JSON.parse(localStorage.getItem("task")) || [];
   task.forEach((task) => renderTask(task));

   addbutton.addEventListener('click', () => {
       const tasktext = todoInput.value.trim();
       if (tasktext === "") return;
       const newTask = {
           id: Date.now(),
           text: tasktext,
           completed: false
       }

       task.push(newTask);
       todoInput.value = '';
       renderTask(newTask);  // Show on screen
         saveTask();   

   })
function renderTask(taskItem) {
  const li = document.createElement('li');    
  li.setAttribute('data-id', taskItem.id);
  if (taskItem.completed) li.classList.add('completed');

  li.innerHTML = `
      <span class="task-text">${taskItem.text}</span>
      <button class="btn-delete">Delete</button>
  `;

  // ✅ Toggle complete
  li.addEventListener('click', (e) => {
    if (!e.target.classList.contains('btn-delete')) {
      taskItem.completed = !taskItem.completed;
      li.classList.toggle('completed');
      saveTask();
    }
  });

  // ✅ Delete logic fix
  li.querySelector('.btn-delete').addEventListener('click', (e) => {
    e.stopPropagation();
    const idToDelete = taskItem.id;
    task = task.filter(t => t.id !== idToDelete);
    li.remove();
    saveTask();
  });

  todotask.appendChild(li);
}
});
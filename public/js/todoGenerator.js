const createStickyTemplate = function(todo) {
  const tasksAsHtml = todo.tasks.map(task => createTaskTemplate(task));

  let html = `<div class="todo" id="__TODOID__">
        <div class="todo-title">
          <input class="todo-heading" value="__TODOTITLE__" onchange="editTodoTitle(this.value,'__TODOID__')"></input>
          <img
            class="delete hoverable"
            src="https://img.icons8.com/material-sharp/384/000000/delete-sign.png"
            onclick="toggleTodoDeleteBox('__TODOID__')"
          />
        </div>
        <div class="tasks">
        __TASKS__
        </div>
        <div class="add-new-todo-box flex">
            <input placeholder="Add Task..." id="addNewTodo__TODOID__" onkeydown="createTask('addNewTodo__TODOID__','__TODOID__',true)"/>
            <div><img class="center hoverable" src="https://img.icons8.com/material-outlined/24/000000/add.png" onclick="createTask('addNewTodo__TODOID__','__TODOID__')" 
           ></div>
        </div>
      </div>`;

  html = html.replace(/__TODOID__/g, todo.id);
  html = html.replace(/__TODOTITLE__/g, todo.title);
  return html.replace(/__TASKS__/g, tasksAsHtml.join(''));
};

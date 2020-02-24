const createTaskTemplate = function(task) {
  let html = `<div class='task flex' id="__TASKID__">
    <div class='checkbox hoverable' onclick="editTaskStatus('__TASKID__')">
      <div class='center'>
        <div class='check center __COMPLETEORNOT__'></div>
      </div>
    </div>
    <input class='task-tile' value='__TASKCAPTION__' onchange="editTaskCaption(this.value, '__TASKID__')"></input>
    <div>
      <img
        class='hoverable'
        src='https://img.icons8.com/material-sharp/384/000000/delete-sign.png'
        onclick="deleteTask('__TASKID__')"
      />
    </div>
  </div>`;

  html = html.replace(/__COMPLETEORNOT__/g, task.done ? '' : 'hide');
  html = html.replace(/__TASKID__/g, task.id);
  return html.replace(/__TASKCAPTION__/g, task.caption);
};

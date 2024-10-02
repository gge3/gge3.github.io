document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const progressBar = document.getElementById('progress-bar');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Load tasks from localStorage or initialize as an empty array
  
    // Render tasks on page load
    renderTasks();
    updateProgress();
  
    taskForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const taskTitle = document.getElementById('task-title').value;
      const taskDesc = document.getElementById('task-desc').value;
      const task = { title: taskTitle, desc: taskDesc, completed: false };
  
      tasks.push(task);
      saveTasksToLocalStorage(); // Save tasks to localStorage after adding a new task
      renderTasks();
      updateProgress();
      taskForm.reset();
    });
  
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('checked');
  
        const title = document.createElement('span');
        title.textContent = task.title + ": " + task.desc;
  
        const customCheckbox = document.createElement('div');
        customCheckbox.className = 'custom-checkbox';
        if (task.completed) customCheckbox.classList.add('checked');
        customCheckbox.addEventListener('click', function () {
          task.completed = !task.completed;
          saveTasksToLocalStorage(); // Save the updated task status
          updateProgress();
          renderTasks();
        });
  
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function () {
          tasks.splice(index, 1);
          saveTasksToLocalStorage(); // Save the updated tasks after removal
          updateProgress();
          renderTasks();
        });
  
        li.appendChild(customCheckbox);
        li.appendChild(title);
        li.appendChild(removeButton);
        taskList.appendChild(li);
      });
    }
  
    function updateProgress() {
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(task => task.completed).length;
      const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
      
      progressBar.value = progressPercentage;
  
      // Change progress bar color when completed
      if (progressPercentage === 100) {
        progressBar.classList.add('complete');
      } else {
        progressBar.classList.remove('complete');
      }
    }
  
    // Function to save tasks to localStorage
    function saveTasksToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(tasks)); // Convert tasks array to a JSON string
    }
  });
  
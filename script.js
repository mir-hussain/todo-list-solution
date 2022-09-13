const getElement = (id) => {
  const element = document.getElementById(id);
  return element;
};

const render = () => {
  const ul = getElement("todo-list");

  ul.innerHTML = "";

  const todos = JSON.parse(localStorage.getItem("TODOS"));

  if (todos) {
    todos?.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("py-2", "flex", "justify-between");

      li.innerHTML = `<p>${item.title}</p> 
      <button onclick="handleDelete('${item.id}')" class="bg-red-400 px-2 py-1 rounded-md" >Del</button>`;

      ul.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.classList.add("py-2");

    li.innerText = "No todo found";

    ul.appendChild(li);
  }
};

const handleSubmit = () => {
  const todos = JSON.parse(localStorage.getItem("TODOS"));

  const todoText = getElement("todo-text").value;

  const id = Math.random().toString(36).slice(2);

  if (!todos && todoText) {
    const todoList = [
      {
        id,
        title: todoText,
        completed: false,
      },
    ];

    localStorage.setItem("TODOS", JSON.stringify(todoList));
  } else if (todos && todoText) {
    const todoList = [
      ...todos,
      {
        id,
        title: todoText,
        completed: false,
      },
    ];
    localStorage.setItem("TODOS", JSON.stringify(todoList));
  }

  getElement("todo-text").value = "";
  render();
};

const clearAll = () => {
  localStorage.removeItem("TODOS");

  render();
};

const handleDelete = (id) => {
  console.log(id);
  const todos = JSON.parse(localStorage.getItem("TODOS"));

  const remainingTodos = todos.filter((item) => item.id != id);
  console.log(remainingTodos);

  if (remainingTodos.length) {
    localStorage.setItem("TODOS", JSON.stringify(remainingTodos));
  } else {
    localStorage.removeItem("TODOS");
  }

  render();
};

render();

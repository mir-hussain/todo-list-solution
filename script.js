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
      li.classList.add("py-2");

      li.innerText = item.title;

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

  if (!todos && todoText) {
    const todoList = [
      {
        title: todoText,
        completed: false,
      },
    ];

    localStorage.setItem("TODOS", JSON.stringify(todoList));
  } else if (todos && todoText) {
    const todoList = [
      ...todos,
      {
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

render();

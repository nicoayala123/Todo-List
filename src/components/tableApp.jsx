import { useState } from "react";
import "./tableApp.css";
import Table from "./table";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';

export default function TableApp() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  function handleInputChange(e) {
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() === "") {
      setErrorMessage("Por favor, ingresa una tarea antes de agregar.");
      return;
    }
    const newTodo = {
      id: Date.now(),
      title: title,
      completed: false,
    };

    const oldTodos = [...todos];
    oldTodos.unshift(newTodo);

    setTodos(oldTodos);
    setTitle("");
    setErrorMessage("");
  }

  function handleDelete(id) {
    const tempTodos = todos.filter((item) => item.id !== id);

    setTodos([...tempTodos]);
  }

  function handleUpdate(id, value) {
    const temp = [...todos];
    const item = temp.find((item) => item.id === id);
    item.title = value;
    setTodos([...temp]);
  }

  function handleCheckboxChange(id, status) {
    const temp = [...todos];
    const item = temp.find((item) => item.id === id);
    item.completed = status;

    setTodos([...temp]);
  }

  return (

    <div className="todoContainer">
      <div className="todoBox">
        <div className="tittleTodo">
          <h1> Todo List </h1>
        </div>
        <form onSubmit={handleSubmit} className="todoCreateForm">
          <TextField
            id="outlined-basic"
            label="Tarea por hacer"
            variant="outlined"
            className="todoInput"
            onChange={handleInputChange}
            value={title} />
          <Button variant="outlined"
            disableElevation
            type={"submit"}
            size="medium">
            Add
          </Button>          
        </form>
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        <div className="todosContainer">
          {todos.map((item) => (
            <Table
              key={item.id}
              item={item}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onComplete={handleCheckboxChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
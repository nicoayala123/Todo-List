import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete'
import "./tableApp.css";
import { Button } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function Table({ item, onUpdate, onComplete, onDelete }) {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(item.title ?? "");

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleUpdate() {
    onUpdate(item.id, value);
    setIsEdit(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(item.id, value);
    setIsEdit(false);
  }

  function handleCheckboxChange(e) {
    onComplete(item.id, e.target.checked);
  }

  return (
    <div className="todo">
      {isEdit ? (
        <form onSubmit={handleSubmit} className="todoUpdateForm">
          <input
            className="todoInput"
            type="text"
            value={value}
            onChange={handleChange}
          />
          <Button color="primary"
            size="small"
            variant="contained"
            onClick={handleUpdate}
            style={{ textAlign: 'center', fontSize: '10px' }}
          >
            Update
          </Button>

        </form>
      ) : (
        <div className="todoInfo">
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={item.checked}
          />
          <span
            className="todoTitle"
            style={{
              color: item.completed ? "#ccc" : "",
              textDecoration: item.completed ? "line-through" : "",
            }}
          >
            {item.title}
          </span>
          <ModeEditIcon
            className="editIcon"
            onClick={() => setIsEdit(true)}
            >
          </ModeEditIcon>
          <DeleteIcon
            variant="primary"
            className="editIcon"
            onClick={() => onDelete(item.id)} 
            />
        </div>
      )}
    </div>
  );
}
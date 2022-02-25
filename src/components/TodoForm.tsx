import { useState } from "react";
import { useDispatch } from "react-redux";
import {addTodo, clearTodos, sortTodos} from "../store/todoSlice";

let id = 100;

const TodoForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleAction = () => {
    if (text.trim().length) {
      const formData = {
        userId: 1,
        id: id++,
        title: text,
        completed: false
      };
      dispatch(addTodo(formData));
      setText("");
    }
  };

  const handleSort = () => {
    dispatch(sortTodos());
  };

  const clear = () => {
    dispatch(clearTodos());
  };

  return (
    <div className="forma">
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAction}>Добавить</button>
      <button onClick={handleSort}>Сортировать</button>
      <button onClick={clear}>Очистить</button>
    </div>
  );
};

export default TodoForm;

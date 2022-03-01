import { useState } from "react";
import { useDispatch } from "react-redux";
import {addTodo, clearTodos, getTodosThunk, sortTodos} from "../store/todoSlice";

let id = 100;

const TodoForm = () => {
  const [text, setText] = useState("");
  const [limit, setLimit] = useState(10);

  const dispatch = useDispatch();

  const handleAction = () => {
    setLimit(limit + 10);
    dispatch(getTodosThunk(limit));
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

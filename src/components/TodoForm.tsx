import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todoSlice";

const TodoForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleAction = () => {
    if (text.trim().length) {
      const formData = {
        userId: 1,
        id: Math.floor(Math.random() * 100),
        title: text,
        completed: false
      };
      dispatch(addTodo(formData));
      setText("");
    }
  };
  return (
    <div className="forma">
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAction}>Добавить</button>
    </div>
  );
};

export default TodoForm;

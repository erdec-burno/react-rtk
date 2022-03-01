import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  toggleCompleteTodoThunk,
  removeTodoThunk,
  getTodosThunk
} from "../store/todoSlice";

const TodoList = () => {
  const { todos, isLoading } = useSelector(
    (state: RootState) => state.todosData
  );
  const dispatch = useDispatch();

  /*useEffect(() => {
    dispatch(getTodosThunk());
  }, [dispatch]);*/

  return (
    <>
      {todos.length ? "" : "нет данных..."}
      <ul style={{ opacity: isLoading ? "0.5" : "1" }}>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleCompleteTodoThunk(todo))}
            />
            <span>
              {todo.title}
            </span>
            <span onClick={() => dispatch(removeTodoThunk(todo.id))}>
              &times;
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;

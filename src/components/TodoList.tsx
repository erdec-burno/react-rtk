import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { toggleCompleteTodo, removeTodo } from "../store/todoSlice";

const TodoList = () => {
  const todos = useSelector((state: RootState) => state.todosData.todos);
  const dispatch = useDispatch();

  return (
    <>
      {todos.length ? "" : "нет данных..."}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleCompleteTodo(todo.id))}
            />
            <span>{todo.title}</span>
            <span onClick={() => dispatch(removeTodo(todo.id))}>&times;</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;

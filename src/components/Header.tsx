import { useSelector } from "react-redux";
import { RootState } from "../store";

const Header = () => {
  const todos = useSelector((state: RootState) => state.todosData.todos);
  const count = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;

  return (
    <header>
      Количество: {count > 0 ? count : "пусто..."} | Завершенных: {completed}
    </header>
  );
};

export default Header;

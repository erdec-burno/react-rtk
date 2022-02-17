import { useSelector } from "react-redux";
import {todosEntities} from "../store/todoSelector";

const Header = () => {
  const todos = useSelector(todosEntities);
  const count = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;

  return (
    <header>
      Количество: {count > 0 ? count : "пусто..."} | Завершенных: {completed}
    </header>
  );
};

export default Header;

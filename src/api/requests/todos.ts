import { ITodo } from "../dto/ITodo";

export const getTodos = async (): Promise<ITodo[]> => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10"
  );

  return await response.json();
};

export const removeTodo = async (id: number) => {
  await fetch("https://jsonplaceholder.typicode.com/todos/" + id, {
    method: "DELETE"
  });

  return id;
};

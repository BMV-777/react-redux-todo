import TodoItem from "./TodoIItem";
import { useSelector } from "react-redux";
// import removeTodo from '../store/todoSlice';

const TodoList = () => {
  const todos = useSelector(state => state.todo.todo);
  // const remuve = removeTodo();
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          // removeTodo={removeTodo}
          // toggleTodoComplete={toggleTodoComplete}
          {...todo}
        />
      ))}
    </ul>
  );
};
export default TodoList ;

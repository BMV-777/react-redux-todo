import TodoItem from "./TodoIItem";
import { useSelector } from "react-redux";

const TodoList = ({ removeTodo, toggleTodoComplete }) => {
 const todos = useSelector(state => state.todo.todo)
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

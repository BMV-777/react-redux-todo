import { useDispatch } from "react-redux";
import { todoDelete, toggleStatus } from "../store/todoSlice";

const TodoItem = ({ title, id, completed }) => {
  const despatch= useDispatch();
  
  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => despatch(toggleStatus(id ))}
      />
      <span>{title}</span>
      <span className="delete" onClick={() => despatch(todoDelete(id))}>
        &times;
      </span>
    </li>
  );
};
export default TodoItem;

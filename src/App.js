import { useState, useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { addleNewTodo, fetchTodo } from "./store/todoSlice";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";

function App() {
  // const [todo, setTodo] = useState([])
  const [text, setText] = useState("");
  const { status, error } = useSelector((state) => state.todo);
  const despatch = useDispatch();

  const addTask = () => {
    if (text.trim().length) {
      despatch(addleNewTodo(text));
      setText("");
    }
  };

  useEffect(() => {
    despatch(fetchTodo());
  }, [despatch]);

  return (
    <div className="App">
      <InputField text={text} handelInput={setText} handelSubmit={addTask} />

      {status === "loading" && <h2>Loading...</h2>}
      {error && <h2>Error: {error}</h2>}
      <TodoList />
    </div>
  );
}

export default App;

//  <TodoList
//    todo={todo}
//    removeTodo={removeTodo}
//    toggleTodoComplete={toggleTodoComplete}
//  />;

// const addTodo = () => {
//     if (text.trim().length) {
//       setTodo([
//         ...todo,
//        {
//         id: new Date().toISOString(),
//           text,
//         completed: false,
//        }
//       ]);
//       setText("");
//     }
//  }

//  const removeTodo = (todoId) => {
//    setTodo(todo.filter(todos => todos.id !== todoId))
//  }

//  const toggleTodoComplete = (todoId) => {
//   setTodo(
//     todo.map(todos => {
//       if (todos.id !== todoId) return todos;

//       return {
//         ...todos,
//         completed: !todos.completed,
//       }
//     })

//   )

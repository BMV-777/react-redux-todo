import { useState } from "react";
// import { useEffect } from 'react';
import "./App.css";
import { useDispatch } from "react-redux";
import { addTodo } from "./store/todoSlice";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";

function App() {
  // const [todo, setTodo] = useState([])
  const [text, setText] = useState("");
  const despatch = useDispatch();

  const addTask = () => {
    despatch(addTodo({ text }));
    setText("");
  };

  return (
    <div className="App">
      <InputField text={text} handelInput={setText} handelSubmit={addTask} />

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

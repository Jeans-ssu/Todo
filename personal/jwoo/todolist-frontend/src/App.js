import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const BASEURL = "http://localhost:3001";

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    await axios
      .get(BASEURL + "/todo")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((error) => console.error(error));
  }

  const handleChangeText = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  function insertTodo(e) {
    e.preventDefault(); //새로고침 방지

    const insertTodo = async () => {
      await axios
        .post(BASEURL + "/todo", {
          todoName: input,
          completed: false,
        })
        .then((res) => {
          console.log(res.data);
          setInput("");
          getTodos();
        })
        .catch((error) => console.log(error));
    };
    insertTodo();
    console.log("할 일 추가");
  }

  function updateTodo(id) {
    const updateTodo = async () => {
      await axios
        .put(BASEURL + "/todo/" + id, {}) //백엔드 연결할 때는 PUT으로
        .then((res) => {
          //getTodos();
          //화면에서만 바꿔주기
          setTodos(
            todos.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
          );
        })
        .catch((error) => console.log(error));
    };
    updateTodo();
  }

  function deleteTodo(id) {
    const deleteTodo = async () => {
      await axios
        .delete(BASEURL + "/todo/" + id, {})
        .then((res) => {
          setTodos(
            todos.filter((todo) => {
              return todo.id !== id;
            })
          );
        })
        .catch((error) => console.log(error));
    };
    deleteTodo();
  }
  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <form onSubmit={insertTodo}>
        Todo &nbsp;
        <input
          type="text"
          required={true}
          value={input}
          onChange={handleChangeText}
        />
        <input type="submit" value="Create" />
      </form>
      {todos
        ? todos.map((todo) => {
            return (
              <div className="todo" key={todo.id}>
                <h3>
                  <label
                    className={todo.completed ? "completed" : null}
                    onClick={() => {
                      updateTodo(todo.id);
                    }}
                  >
                    {todo.todoName}
                  </label>
                  <label onClick={() => deleteTodo(todo.id)}>&nbsp;X</label>
                </h3>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default App;

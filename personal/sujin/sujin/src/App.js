import React, { useState, useEffect } from "react"
import axios from "axios";
import './App.css';


function App() {
  const baseUrl = "http://localhost:8080"

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    getTodos();
  }, [])  // 한번만 실행됨

  async function getTodos() {   // 비동기 호출
    await axios
      .get(baseUrl + '/todo')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function insertTodo(e) {
    e.preventDefault();

    const insertTodo = async () => {
      await axios
            .post(baseUrl + '/todo', {
              todoName : input
            })
            .then((response) => {
              console.log(response.data)
              setInput(""); // 초기화
              getTodos();  // 추가한 데이터 다시 받아오기
            })
            .catch((error) => {
              console.error(error);
            })
    }
    insertTodo();
    console.log("할일이 추가됨");
  }

  function updateTodo(id){
    const updateTodo = async () => {
      await axios
            .put(baseUrl + '/todo/' + id, {})
            .then((response) => {
              setTodos(
              // 화면에서만 바꾸기 디비까지 접근하기 싫다
              // 어차피 바뀐거 아니까!
              todos.map((todo) =>
                  todo.id === id ? { ...todo, completed: !todo.completed} : todo
                )
              )
            })
            .catch((error) => {
              console.error(error);
            })
    }
    updateTodo();
    
  }

  function deleteTodo(id) {
    const deleteTodo = async () => {
      await axios
            .delete(baseUrl + '/todo/' + id, {})
            .then((response) => {
              // getTodos(); -> 쓸데없이 디비 한번 더 조회하므로 주석처리
              setTodos(
              // 화면에서만 바꾸기 디비까지 접근하기 싫다
              // 어차피 바뀐거 아니까!
                todos.filter((todo) => todo.id !== id)
              )
            })
            .catch((error) => {
              console.error(error);
            })
    }
    deleteTodo();
  }

  function changeText(e){
    e.preventDefault();   // 다른행동 막기
    setInput(e.target.value)  // input값을 setinput에 넣어준다
  }

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <form onSubmit={insertTodo}>
        <label>
          Todo &nbsp;
          <input type="text" required={true} value={input} onChange={changeText} />
        </label>
        <input type="submit" value="Create" />
      </form>
      {
        todos
        ? todos.map((todo) => {
          return (
            <div className="todo" key={todo.id}>
              <h3>
                <label 
                  className={todo.completed ? "completed" : null}
                  onClick={() => updateTodo(todo.id)}>
                  {todo.todoName}
                </label>
                <label onClick={() => deleteTodo(todo.id)}>&nbsp;&nbsp;&nbsp;❌</label>
              </h3>
            </div>
          )
        })
         : null
      }
    </div>
  );
}

export default App;

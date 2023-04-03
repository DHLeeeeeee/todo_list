import './style/reset.css';
import './style/main.css';
import { useState, useRef } from 'react';

function App() {
  const [todos, setTodos] = useState([]); // 할 일 목록

  const inputValue = useRef(); // input에 입력한 값을 저장

  const handleAddTodo = (e) => {
    e.preventDefault(); // 아무것도 입력하지 않고 엔터쳤을때 새로고침 막음
    const trimmedValue = inputValue.current.value.trim(); // 띄어쓰기 방지 trim으로 문자열의 앞 뒤 공백제거
    if (trimmedValue !== '') {
      // 입력값이 빈 문자열이 아닐 경우에만 동작
      const newTodo = { id: Date.now(), content: trimmedValue, done: false, edit: false, menu: false };
      setTodos([newTodo, ...todos]);
      console.log(todos);
      inputValue.current.value = '';
    }
  };

  // 삭제 버튼 클릭시 해당 할 일 요소 삭제하는 함수
  const deleteHandler = (id) => {
    const newTodo = todos.filter((it) => it.id !== id);
    setTodos(newTodo);
  };

  // Do : Done 을 체크하는 함수
  const checkDone = (it) => {
    it.done = !it.done;
  };

  // 메뉴 버튼 클릭시 메뉴를 표시하는 함수
  const menuViewHandler = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, menu: !todo.menu };
        } else {
          return { ...todo, menu: false };
        }
      })
    );
  };

  // 수정 버튼 클릭시 input 태그로 변경하는 함수
  const editHandler = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, edit: true, menu: false };
        } else {
          return todo;
        }
      })
    );
  };

  // input 태그에서 엔터를 눌렀을 때 수정된 값으로 바꿔주는 함수
  const handleKeyDown = (event, id) => {
    if (event.key === 'Enter') {
      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, content: event.target.value, edit: false };
          } else {
            return todo;
          }
        })
      );
    }
  };

  return (
    <div className='wrap'>
      <button onClick={() => console.log(todos)}>TEST</button>
      <header className='header'>
        <h1>Todo list</h1>
        <p>2023.03.30</p>
      </header>
      <form className='addTodo' action=''>
        <input type='text' ref={inputValue} />
        <button onClick={handleAddTodo}>Add Todo</button>
      </form>
      <section className='todo'>
        <ul className='todoList'>
          {todos.map((it) => (
            <li className='todoItm' key={it.id}>
              <input type='checkbox' name='check for doon' onChange={() => checkDone(it)} />
              {it.edit ? <input type='text' defaultValue={it.content} onKeyDown={(e) => handleKeyDown(e, it.id)} /> : <p>{it.content}</p>}
              <button onClick={() => menuViewHandler(it.id)}>메뉴</button>
              {it.menu && (
                <ul className='todoMenu'>
                  <li>
                    <button onClick={() => editHandler(it.id)}>수정</button>
                  </li>
                  <li>
                    <button onClick={() => deleteHandler(it.id)}>삭제</button>
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </section>
      <form className='clearMenu' action=''>
        <button>Clear checked</button>
        <button>Clear All</button>
      </form>
    </div>
  );
}

export default App;

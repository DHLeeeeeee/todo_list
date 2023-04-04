import './style/reset.css';
import './style/main.css';
import { useState, useRef, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]); // To do Item List

  const [classForTodo, setClassForTodo] = useState('todoItm');

  const inputValue = useRef(); // addTodo 입력값 저장

  // To do Item 추가 함수

  const handleAddTodo = (e) => {
    e.preventDefault(); // 아무것도 입력하지 않고 엔터쳤을때 새로고침 막음
    const trimmedValue = inputValue.current.value.trim(); // 띄어쓰기 방지 trim으로 문자열의 앞 뒤 공백제거
    if (trimmedValue !== '') {
      // 입력값이 빈 문자열이 아닐 경우에만 동작

      /*  TO DO ITEM
        id: 각 아이템의 ID값
        content: 사용자가 입력한 To Do 
        check: To Do를 끝냈을때 체크 확인 
        edit: 수정 모드를 확인 하는 값
        menu: 메뉴를 열지 닫을지 확인 하는 값
      */

      const newTodo = { id: Date.now(), content: trimmedValue, check: false, edit: false, menu: false };

      // 세팅 된 자료형에 맞춰서 To do Item List에 추가됨
      setTodos([newTodo, ...todos]);

      // To do item을 추가 한 뒤 입력창 리셋
      inputValue.current.value = '';
    }
  };

  // Do : Done 을 체크하는 함수
  const handleCheck = (item) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === item.id) {
        return { ...todo, check: !todo.check };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  // 메뉴 버튼 클릭시 메뉴를 표시하는 함수
  const menuViewHandler = (id) => {
    // 클릭 된 item의 id 값을 받아온다
    setTodos(
      todos.map((todo) => {
        // 모든 todo item을 체크해서
        if (todo.id === id) {
          // 클릭 된 item과 같은 id 값의 todo item을 찾음
          return { ...todo, menu: !todo.menu }; // 해당 item 의 현재 menu 값을 반대로 돌려 메뉴를 표시할지 말지 선택함
        } else {
          return { ...todo, menu: false }; // 다른 id의 item들의 menu 값을 false로 바꿔서 메뉴가 동시에 여러개가 보이는 것을 방지
        }
      })
    );
  };

  // 수정 모드 진입 시 포커싱을 위한 참조
  const editRef = useRef(null);

  // 수정 모드일때 P 태그를 Input 태그로 변경하는 함수
  const editHandler = (id) => {
    // 클릭 된 item의 id 값을 받아온다
    setTodos(
      todos.map((todo) => {
        // 모든 todo item을 체크해서
        if (todo.id === id) {
          // 클릭 된 item과 같은 id 값의 todo item을 찾음
          return { ...todo, edit: true, menu: false }; // 해당 item 의 edit 값을 true로 변경하여 수정모드로 진입 동시에 menu 값을 false로 변경해서 닫는다.
        } else {
          return todo;
        }
      })
    );
  };

  // 수정 모드일때 Input 태그에 바로 포커싱
  useEffect(() => {
    if (editRef.current) {
      editRef.current.focus();
    }
  }, [todos]);

  // 현재 To Do Item이 수정 모드 일경우 엔터를 눌렀을 때 수정된 값으로 바꿔주는 함수
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

  // 수정 중에 포커싱 해제되면 수정
  const handleBlur = (id, value) => {
    // 수정 중인 아이템인 경우에만 실행
    const editingItem = todos.find((item) => item.id === id && item.edit);
    if (editingItem) {
      // 입력값이 빈 문자열이 아닐 경우에만 동작
      const trimmedValue = value.trim();
      if (trimmedValue !== '') {
        setTodos(todos.map((item) => (item.id === id ? { ...item, content: trimmedValue, edit: false } : item)));
      }
    }
  };

  // 삭제 버튼 클릭시 해당 할 일 요소 삭제하는 함수
  const deleteHandler = (id) => {
    const newTodo = todos.filter((it) => it.id !== id);
    setTodos(newTodo);
  };

  const deleteCheck = (e) => {
    e.preventDefault();
    const newTodo = todos.filter((todo) => todo.check === false);
    setTodos(newTodo);
  };

  const deleteAll = (e) => {
    e.preventDefault();
    setTodos([]);
  };

  return (
    <div className='wrap'>
      <button onClick={() => console.log(todos)}>TEST</button>

      {/* 헤더 */}
      <header className='header'>
        <h1>Todo list</h1>
        <p>2023.03.30</p>
      </header>

      {/* To do 입력 */}
      <form className='addTodo' action=''>
        <input type='text' ref={inputValue} />
        <button onClick={handleAddTodo}>Add Todo</button>
      </form>

      {/* To do 리스트 */}
      <section className='todo'>
        <ul className='todoList'>
          {todos.map((it) => (
            <li className={it.check ? 'todoItm on' : 'todoItm'} key={it.id}>
              {/* To do 체크박스 */}
              <input id={`check${it.id}`} type='checkbox' onChange={() => handleCheck(it)} />
              {it.edit ? (
                // 수정모드 진입 시 Input 태그로 변환
                <input
                  type='text'
                  ref={editRef}
                  defaultValue={it.content}
                  onKeyDown={(e) => handleKeyDown(e, it.id)}
                  onBlur={(e) => handleBlur(it.id, e.target.value)}
                />
              ) : (
                // To do 텍스트
                <label htmlFor={`check${it.id}`} style={{ flex: '1', textAlign: 'center', cursor: 'pointer' }}>
                  {it.content}
                </label>
              )}

              {/* 메뉴 버튼 */}
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

      {/* 조건 삭제 메뉴 */}
      <form className='clearMenu' action=''>
        <button onClick={(e) => deleteCheck(e)}>Clear checked</button>
        <button onClick={(e) => deleteAll(e)}>Clear All</button>
      </form>
    </div>
  );
}

export default App;

import './style/reset.css';
import './style/main.css';
import { useState, useRef, useEffect, useCallback } from 'react';

function App() {
  const [todos, setTodos] = useState([]); // To do Item List

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
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === item.id ? { ...todo, check: !todo.check } : todo)));
  };

  // 메뉴 버튼 클릭시 메뉴를 표시하는 함수
  const menuViewHandler = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, menu: !todo.menu } : { ...todo, menu: false })));
  };

  // 열려있는 메뉴 참조 값
  const wrapperRef = useRef(null);

  // 다른 곳을 클릭했을 때 메뉴를 닫는 함수
  const handleClickOutside = useCallback((event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      // 메뉴가 열려있고 && 클릭한 곳이 메뉴가 아닐때
      setTodos(
        (
          todos // 새로 이전 To do를 가져와서 menu를 닫고 배열을 생성함
        ) =>
          todos.map((todo) => {
            if (todo.menu) {
              return { ...todo, menu: false };
            }
            return todo;
          })
      );
    }
  }, []);

  useEffect(() => {
    const handleClick = (event) => handleClickOutside(event);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClickOutside]);

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

  // check 된 요소 삭제 함수
  const deleteCheck = (e) => {
    e.preventDefault();
    const newTodo = todos.filter((todo) => todo.check === false);
    setTodos(newTodo);
  };

  // 전부 삭제 함수
  const deleteAll = (e) => {
    e.preventDefault();
    setTodos([]);
  };

  return (
    <div className='wrap'>
      {/* <button onClick={() => console.log(todos)}>TEST</button> */}

      {/* 헤더 */}
      <header className='header'>
        <h1>TO DO LIST</h1>
        <p>2023.03.30</p>

        {/* To do 입력 */}
        <form className='addTodo' onSubmit={handleAddTodo}>
          <input type='text' ref={inputValue} placeholder='Add to do' />
          <button type='button' onClick={handleAddTodo}>
            <span class='material-symbols-rounded'>add</span>
          </button>
        </form>
      </header>

      {/* To do 리스트 */}
      <section className='main'>
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
                <label htmlFor={`check${it.id}`}>{it.content}</label>
              )}

              {/* 메뉴 버튼 */}
              <button onClick={() => menuViewHandler(it.id)}>
                <span class='material-symbols-rounded'>more_horiz</span>
              </button>
              {it.menu && (
                <ul className='todoMenu' ref={wrapperRef}>
                  <li>
                    <button onClick={() => editHandler(it.id)}>
                      <span class='material-symbols-rounded'>edit</span>
                    </button>
                  </li>
                  <li>
                    <button onClick={() => deleteHandler(it.id)}>
                      <span class='material-symbols-rounded'>delete</span>
                    </button>
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* 조건 삭제 메뉴 */}
      <form className='clearMenu' action=''>
        <button onClick={(e) => deleteCheck(e)}>
          <span class='material-symbols-rounded'>unpublished</span>
        </button>
        <button onClick={(e) => deleteAll(e)}>
          <span class='material-symbols-rounded'>delete_forever</span>
        </button>
      </form>
    </div>
  );
}

export default App;

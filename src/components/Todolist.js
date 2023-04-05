import { useCallback, useEffect, useRef } from 'react';
import IconButton from './IconButton';

const Todolist = ({ todos, setTodos }) => {
  // Do : Done 을 체크하는 함수
  const handleCheck = useCallback(
    (item) => {
      setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === item.id ? { ...todo, check: !todo.check } : todo)));
    },
    [setTodos]
  );

  // 메뉴 버튼 클릭시 메뉴를 표시하는 함수
  const menuViewHandler = useCallback(
    (id) => {
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, menu: !todo.menu } : { ...todo, menu: false })));
    },
    [setTodos, todos]
  );

  // 열려있는 메뉴 참조 값
  const wrapperRef = useRef(null);

  // 다른 곳을 클릭했을 때 메뉴를 닫는 함수
  const handleClickOutside = useCallback(
    (event) => {
      // 메뉴가 열려있고 && 클릭한 곳이 메뉴가 아닐때
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
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
    },
    [setTodos]
  );

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
  const editHandler = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, edit: true, menu: false };
          } else {
            return todo;
          }
        })
      );
    },
    [setTodos, todos]
  );

  // 수정 모드일때 Input 태그에 바로 포커싱
  useEffect(() => {
    if (editRef.current) {
      editRef.current.focus();
    }
  }, [todos]);

  // 현재 To Do Item이 수정 모드 일경우 엔터를 눌렀을 때 수정된 값으로 바꿔주는 함수
  const handleKeyDown = useCallback(
    (event, id) => {
      if (event.key === 'Enter') {
        const trimmedValue = event.target.value.trim();
        setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, content: trimmedValue, edit: false } : todo)));
      }
    },
    [setTodos]
  );

  // 수정 중에 포커싱 해제되면 수정
  const handleBlur = useCallback(
    (id, value) => {
      // 수정 중인 아이템인 경우에만 실행
      const editingItem = todos.find((item) => item.id === id && item.edit);
      if (editingItem) {
        // 입력값이 빈 문자열이 아닐 경우에만 동작
        const trimmedValue = value.trim();
        if (trimmedValue !== '') {
          setTodos(todos.map((item) => (item.id === id ? { ...item, content: trimmedValue, edit: false } : item)));
        }
      }
    },
    [setTodos, todos]
  );

  // 삭제 버튼 클릭시 해당 할 일 요소 삭제하는 함수
  const deleteHandler = useCallback(
    (id) => {
      setTodos((prevTodos) => prevTodos.filter((it) => it.id !== id));
    },
    [setTodos]
  );

  return (
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
            <IconButton onClick={() => menuViewHandler(it.id)} icon='more_horiz' />

            {it.menu && (
              <ul className='todoMenu' ref={wrapperRef}>
                <li>
                  <IconButton onClick={() => editHandler(it.id)} icon='edit' />
                </li>
                <li>
                  <IconButton onClick={() => deleteHandler(it.id)} icon='delete' />
                </li>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Todolist;

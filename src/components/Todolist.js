import styled from 'styled-components';
import { useState } from 'react';

const Todolist = ({ todos, setTodos }) => {
  const List = styled.ul``;
  const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    position: relative;
  `;
  const Menu = styled.ul`
    position: absolute;
    z-index: 999;
    top: 0;
    right: 0;
  `;

  // 메뉴를 표시를 제어하는 상태
  const [menu, setMenu] = useState(false);

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
  const menuViewHandler = () => {
    setMenu(!menu);
  };

  // 수정 버튼 클릭시 input 태그로 변경하는 함수
  const editHandler = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isEditing: true };
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
            return { ...todo, content: event.target.value, isEditing: false };
          } else {
            return todo;
          }
        })
      );
    }
  };

  return (
    <section>
      <List>
        {todos.map((it) => (
          <ListItem key={it.id}>
            <input type='checkbox' name='check for doon' onChange={() => checkDone(it)} />
            {it.isEditing ? <input type='text' defaultValue={it.content} onKeyDown={(e) => handleKeyDown(e, it.id)} /> : <p>{it.content}</p>}
            <button onClick={menuViewHandler}>DELETE</button>
            {menu && (
              <Menu>
                <li>
                  <button onClick={() => editHandler(it.id)}>수정</button>
                </li>
                <li>
                  <button onClick={() => deleteHandler(it.id)}>삭제</button>
                </li>
              </Menu>
            )}
          </ListItem>
        ))}
      </List>
    </section>
  );
};

export default Todolist;

import { useState, useRef } from 'react';
import styled from 'styled-components';
import Todolist from './Todolist';

const Todo = () => {
  const [todos, setTodos] = useState([]); // 할 일 목록

  const inputValue = useRef(); // input에 입력한 값을 저장

  const handleAddTodo = () => {
    const trimmedValue = inputValue.current.value.trim(); // 띄어쓰기 방지 trim으로 문자열의 앞 뒤 공백제거
    if (trimmedValue !== '') {
      // 입력값이 빈 문자열이 아닐 경우에만 동작
      const newTodo = { id: Date.now(), content: trimmedValue, done: false };
      setTodos([newTodo, ...todos]);
      console.log(todos);
      inputValue.current.value = '';
    }
  };

  const TodoWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 600px;
    background-color: yellow;

    & section {
      flex: 1;
      margin: 0px 10px 10px;
      overflow: scroll;

      /* 스크롤 숨기기 */
      -ms-overflow-style: none; /* 인터넷 익스플로러 */
      scrollbar-width: none; /* 파이어폭스 */

      &::-webkit-scrollbar {
        display: none; /* 크롬, 사파리, 오페라, 엣지 */
      }
    }
  `;

  const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background: blue;
    color: #fff;

    & h1 {
      font-size: 24px;
    }
  `;

  const Input = styled.form`
    display: flex;
    justify-content: space-between;
    margin: 10px;

    & input {
    }

    & button {
    }
  `;

  return (
    <TodoWrap>
      <button onClick={() => console.log(todos)}>TEST</button>
      <Header>
        <h1>Todo list</h1>
        <p>2023.03.30</p>
      </Header>
      <Input>
        <input type='text' ref={inputValue} />
        <button onClick={handleAddTodo}>Add Todo</button>
      </Input>
      <Todolist todos={todos} setTodos={setTodos} />
      <Input>
        <button>Clear checked</button>
        <button>Clear All</button>
      </Input>
    </TodoWrap>
  );
};

export default Todo;

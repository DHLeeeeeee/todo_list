import { useState, useRef } from 'react';
import styled from 'styled-components';
import Todolist from './Todolist';

const Todo = () => {
  const [todos, setTodos] = useState([]); // 할 일 목록을 배열로 state에 저장

  const inputValue = useRef(); // input에 입력한 값을 저장

  const handleAddTodo = () => {
    const trimmedValue = inputValue.current.value.trim(); // 띄어쓰기 방지 trim으로 문자열의 앞 뒤 공백제거
    if (trimmedValue !== '') {
      // 입력값이 빈 문자열이 아닐 경우에만 동작
      setTodos([...todos, trimmedValue]);
      inputValue.current.value = '';
    }
  };

  const TodoWrap = styled.div`
    width: 400px;
    height: 600px;
    background-color: yellow;
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

  return (
    <TodoWrap>
      <Header>
        <h1>Todo list</h1>
        <p>2023.03.30</p>
      </Header>
      <input type='text' ref={inputValue} />
      <button onClick={handleAddTodo}>Add Todo</button>
      <Todolist todos={todos} setTodos={setTodos} />
    </TodoWrap>
  );
};

export default Todo;

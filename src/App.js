import './style/reset.css';
import './style/main.css';
import { useState } from 'react';
import Todolist from './components/Todolist';
import Header from './components/Header';
import Delete from './components/Delete';

function App() {
  // To do Item List
  const [todos, setTodos] = useState([
    {
      id: 1,
      content: '리액트 공부',
      check: false,
      edit: false,
      menu: false,
    },
    {
      id: 2,
      content: 'To do List 만들기',
      check: false,
      edit: false,
      menu: false,
    },
    {
      id: 3,
      content: '대청소 하기',
      check: false,
      edit: false,
      menu: false,
    },
  ]);

  return (
    <div className='wrap'>
      {/* 헤더 */}
      <Header todos={todos} setTodos={setTodos} />

      {/* To do 리스트 */}
      <Todolist todos={todos} setTodos={setTodos} />

      {/* 삭제 메뉴 */}
      <Delete todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;

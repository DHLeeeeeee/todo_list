import { useRef } from 'react';
import IconButton from './IconButton';

const Header = ({ todos, setTodos }) => {
  // addTodo 입력값 저장
  const inputValue = useRef();

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

  return (
    <header className='header'>
      <h1>TO DO LIST</h1>

      {/* To do 입력 */}
      <form className='addTodo' onSubmit={handleAddTodo}>
        <input type='text' ref={inputValue} placeholder='Add to do' />
        <IconButton onClick={handleAddTodo} icon='add' />
      </form>
    </header>
  );
};

export default Header;

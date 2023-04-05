import IconButton from './IconButton';

const Delete = ({ todos, setTodos }) => {
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
    <form className='clearMenu' action=''>
      <IconButton onClick={(e) => deleteCheck(e)} icon='unpublished' />
      <IconButton onClick={(e) => deleteAll(e)} icon='delete_forever' />
    </form>
  );
};

export default Delete;

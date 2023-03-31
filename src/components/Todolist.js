import styled from 'styled-components';
const Todolist = ({ todos, setTodos }) => {
  const List = styled.ul``;
  const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
  `;

  const deleteHandler = (id) => {
    const newTodo = todos.filter((it) => it.id !== id); // 삭제 할 Todo와 ID가 같은 Todo를 제거한 새로운 배열을 만듬
    setTodos(newTodo);
  };

  const checkDone = (it) => {
    it.done = !it.done; // check box가 동작할때 마다 할일의 done 값을 바꿈
  };

  return (
    <section>
      <List>
        {todos.map((it) => {
          return (
            <ListItem>
              <input type='checkbox' name='check for doon' id={Date.now} onChange={() => checkDone(it)} />
              <p>{it.content}</p>
              <button onClick={() => deleteHandler(it.id)}>DELETE</button>
            </ListItem>
          );
        })}
      </List>
    </section>
  );
};

export default Todolist;

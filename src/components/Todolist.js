import styled from 'styled-components';
const Todolist = ({ todos, setTodos }) => {
  const List = styled.ul``;
  const ListItem = styled.li``;

  return (
    <section>
      <List>
        {todos.map((it) => {
          return <ListItem>{it}</ListItem>;
        })}
      </List>
    </section>
  );
};

export default Todolist;

import styled from 'styled-components';
import Todo from './components/Todo';
import style from './style/reset.css';

function App() {
  const Wrap = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;

  return (
    <Wrap>
      <Todo />
    </Wrap>
  );
}

export default App;

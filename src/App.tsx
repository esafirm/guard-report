import { useState } from 'react';

import SideBar from './components/SideBar';
import Container from './components/Container';
import Content from './components/Content';

function App() {
  const [filter, setFilter] = useState('');

  return (
    <Container style={{ flexDirection: 'row' }}>
      <SideBar onChangeFilter={setFilter} />
      <Content filter={filter} />
    </Container>
  );
}

export default App;

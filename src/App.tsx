import { useState } from 'react';

import SideBar from './components/SideBar';
import Container from './components/Container';
import Content from './components/Content';

import { getData, getDataKeys } from './datahandler';

function App() {
  const [filter, setFilter] = useState('');

  return (
    <Container style={{ flexDirection: 'row' }}>
      <SideBar onChangeFilter={setFilter} />
      <Content filter={filter} getDataKeys={getDataKeys} />
    </Container>
  );
}

export default App;

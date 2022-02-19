import { useState } from 'react';

import SideBar from './components/SideBar';
import Container from './components/Container';
import Content from './components/Content';
import TagFilter from './components/TagFilter';

import { getAvailableTags } from './datahandler';

function App() {
  const [filter, setFilter] = useState('');
  const [tagFilter, setTagFilter] = useState<string[]>(getAvailableTags());

  return (
    <Container style={{ flexDirection: 'row' }}>
      <SideBar onChangeFilter={setFilter}>
        <TagFilter tagFilter={tagFilter} onSetTagFilter={setTagFilter} />
      </SideBar>
      <Content filter={filter} tagFilter={tagFilter} />
    </Container>
  );
}

export default App;

import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';

import { getData, getDataKeys } from './datahandler';

function renderList(filter: string) {
  const keys = getDataKeys();
  return keys
    .filter((item) => item.startsWith(filter))
    .map((item) => <ListItem value={item} />);
}

interface ListItemProps {
  value: string;
}

function ListItem(props: ListItemProps) {
  return (
    <TouchableOpacity>
      <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        <Text>{props.value}</Text>
      </View>
    </TouchableOpacity>
  );
}

interface HeaderProps {
  header: string;
}

function Header(props: HeaderProps) {
  return (
    <Text style={{ padding: 8, fontWeight: '700', backgroundColor: '#AAA' }}>
      {props.header}
    </Text>
  );
}

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

function Container(props: ContainerProps) {
  return (
    <View
      style={[
        {
          alignSelf: 'center',
          shadowRadius: 1,
          width: '100vh',
          minHeight: '100vh',
        },
        props.style,
      ]}
    >
      {props.children}
    </View>
  );
}

interface SideBarProps {
  onChangeFilter: (filter: string) => void;
}

function SideBar(props: SideBarProps) {
  return (
    <View
      style={{
        borderColor: 'black',
        borderStartWidth: 1,
        borderTopWidth: 1,
        padding: 16,
      }}
    >
      <TextInput
        style={{ padding: 8, borderWidth: 1 }}
        placeholder={'Filter'}
        onChangeText={(text) => props.onChangeFilter(text)}
      />
    </View>
  );
}

interface ContentProps {
  filter: string;
}

function Content(props: ContentProps) {
  return (
    <View
      style={{
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
      }}
    >
      <Header header={'Class Name'} />
      {renderList(props.filter)}
    </View>
  );
}

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

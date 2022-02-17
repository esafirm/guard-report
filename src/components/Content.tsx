import { View, FlatList } from 'react-native';
import ListItem from './ListItem';
import Header from './Header';

interface ContentProps {
  filter: string;
  getDataKeys: () => string[];
}

export default function Content(props: ContentProps) {
  const items = props
    .getDataKeys()
    .filter((item) => item.startsWith(props.filter));

  return (
    <View
      style={{
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
      }}
    >
      <Header header={'Class Name'} />
      <FlatList
        data={items}
        renderItem={(listItem) => <ListItem value={listItem.item} />}
        keyExtractor={(_, index) => `${index}`}
      />
    </View>
  );
}

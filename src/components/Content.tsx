import { View } from 'react-native';
import ListItem from './ListItem';
import Header from './Header';

interface ContentProps {
  filter: string;
  getDataKeys: () => string[];
}

function renderList(props: ContentProps) {
  const keys = props.getDataKeys();
  return keys
    .filter((item) => item.startsWith(props.filter))
    .map((item) => <ListItem value={item} />);
}

export default function Content(props: ContentProps) {
  return (
    <View
      style={{
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
      }}
    >
      <Header header={'Class Name'} />
      {renderList(props)}
    </View>
  );
}

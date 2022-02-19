import { View, Text, ViewStyle, Pressable, ColorValue } from 'react-native';
import Chip from './Chip';
import { JsonItem } from '../../datahandler';
import Colors from '../../utils/colors';

interface ClassListItemProps {
  item: JsonItem;
  onClassSelected: (className: string) => void;
}

function getTagColor(tag: string) {
  if (tag == 'unused') {
    return Colors.YELLOW;
  }
  if (tag == 'data') {
    return Colors.BLUE;
  }
  if (tag == 'dagger') {
    return Colors.GREEN;
  }
  if (tag == 'binding') {
    return Colors.PURPLE;
  }
  return Colors.RED;
}

function generateTagsChips(tags: string[]) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {tags.map((tag) => (
        <Chip label={tag} color={getTagColor(tag)} />
      ))}
    </View>
  );
}

export default function ClassListItem(props: ClassListItemProps) {
  const className = props.item.parent;
  const children = [
    <Text>{props.item.parent}</Text>,
    generateTagsChips(props.item.tags),
  ];

  const parentStyle: ViewStyle = {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#AAA',
    borderBottomWidth: 0.1,
  };

  if (props.item.tags.includes('unused')) {
    return <View style={parentStyle}>{children}</View>;
  }

  return (
    <Pressable
      onLongPress={() => {
        navigator.clipboard.writeText(className);
        alert('Text copied to Clipboard!');
      }}
      style={(state) => {
        if (state.pressed) {
          return [parentStyle, { opacity: 0.1 }];
        } else {
          return parentStyle;
        }
      }}
      onPress={() => props.onClassSelected(className)}
    >
      {children}
    </Pressable>
  );
}

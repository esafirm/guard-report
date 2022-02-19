import { View, Text, ViewStyle, Pressable } from 'react-native';
import { generateTagsChips } from './Chip';
import { JsonItem } from '../../datahandler';

interface ClassListItemProps {
  item: JsonItem;
  onClassSelected: (className: string) => void;
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

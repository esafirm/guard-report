import {
  View,
  Text,
  ViewStyle,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Chip from './Chip';
import { ClassFlags, JsonItem } from '../../datahandler';
import Colors from '../../utils/colors';

interface ClassListItemProps {
  item: JsonItem;
  onClassSelected: (className: string) => void;
}

function generateFlagChips(flags: ClassFlags) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {flags.unused && <Chip label={'Class'} color={Colors.YELLOW} />}
    </View>
  );
}

export default function ClassListItem(props: ClassListItemProps) {
  const className = props.item.parent;
  const children = [
    <Text>{props.item.parent}</Text>,
    generateFlagChips(props.item.flags),
  ];

  const parentStyle: ViewStyle = {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#AAA',
    borderBottomWidth: 0.1,
  };

  if (props.item.flags.unused) {
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

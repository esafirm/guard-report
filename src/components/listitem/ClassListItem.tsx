import { View, Text } from 'react-native';
import Chip from './Chip';
import { ClassFlags, JsonItem } from '../../datahandler';
import Colors from '../../utils/colors';

interface ClassListItemProps {
  item: JsonItem;
}

function generateFlagChips(flags: ClassFlags) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {flags.unused && <Chip label={'Class'} color={Colors.YELLOW} />}
    </View>
  );
}

export default function ClassListItem(props: ClassListItemProps) {
  return (
    <View
      style={{
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#AAA',
        borderBottomWidth: 0.1,
      }}
    >
      <Text>{props.item.parent}</Text>
      {generateFlagChips(props.item.flags)}
    </View>
  );
}

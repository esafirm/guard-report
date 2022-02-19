import { ColorValue, Text, View, ViewStyle } from 'react-native';
import Colors from '../../utils/colors';

interface ChipProps {
  label: string;
  color?: ColorValue;
  textColor?: ColorValue;
  style?: ViewStyle;
}

export default function Chip(props: ChipProps) {
  return (
    <Text
      style={[
        {
          backgroundColor: props.color ?? getTagColor(props.label),
          borderRadius: 4,
          paddingHorizontal: 4,
          paddingTop: 2,
          fontWeight: '800',
          fontSize: 10,
          color: props.textColor ?? 'white',
        },
        props.style,
      ]}
    >
      {props.label.toUpperCase()}
    </Text>
  );
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

export function generateTagsChips(tags: string[]) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {tags.map((tag) => (
        <Chip label={tag} color={getTagColor(tag)} style={{ marginStart: 4 }} />
      ))}
    </View>
  );
}

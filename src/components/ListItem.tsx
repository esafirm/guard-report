import { TouchableOpacity, View, Text } from 'react-native';

interface ListItemProps {
  value: string;
}

export default function ListItem(props: ListItemProps) {
  return (
    <TouchableOpacity>
      <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        <Text>{props.value}</Text>
      </View>
    </TouchableOpacity>
  );
}

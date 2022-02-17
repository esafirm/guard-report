import { TextInput, View } from 'react-native';

interface SideBarProps {
  onChangeFilter: (filter: string) => void;
}

export default function SideBar(props: SideBarProps) {
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

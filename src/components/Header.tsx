import { Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
  header: string;
  onBackPressed?: () => void;
}

export default function Header(props: HeaderProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 8,
        backgroundColor: '#AAA',
      }}
    >
      {props.onBackPressed && (
        <TouchableOpacity
          style={{ paddingHorizontal: 8 }}
          onPress={props.onBackPressed}
        >
          <Text style={{ fontWeight: '700' }}>{'<<'}</Text>
        </TouchableOpacity>
      )}
      <Text style={{ fontWeight: '700' }}>{props.header}</Text>
    </View>
  );
}

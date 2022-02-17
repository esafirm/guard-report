import { Text } from 'react-native';

interface HeaderProps {
  header: string;
}

export default function Header(props: HeaderProps) {
  return (
    <Text style={{ padding: 8, fontWeight: '700', backgroundColor: '#AAA' }}>
      {props.header}
    </Text>
  );
}

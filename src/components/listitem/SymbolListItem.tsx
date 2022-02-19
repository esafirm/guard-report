import { Text } from 'react-native';

interface SymbolListItemProps {
  packageName: string;
}

export default function SymbolListItem(props: SymbolListItemProps) {
  return (
    <Text
      style={{ padding: 16, borderBottomWidth: 0.1, borderBottomColor: '#AAA' }}
    >
      {props.packageName}
    </Text>
  );
}

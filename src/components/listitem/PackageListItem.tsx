import { TouchableOpacity, Text } from 'react-native';

interface PackageListItemProps {
  packageName: string;
  onPackagePressed: (pacakgeName: string) => void;
}

export default function PackageListItem(props: PackageListItemProps) {
  return (
    <TouchableOpacity
      onPress={() => props.onPackagePressed(props.packageName)}
      style={{ padding: 16, borderBottomColor: '#AAA', borderBottomWidth: 0.1 }}
    >
      <Text>{props.packageName}</Text>
    </TouchableOpacity>
  );
}

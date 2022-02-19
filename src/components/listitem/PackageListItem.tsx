import { TouchableOpacity, Text } from 'react-native';

interface PackageListItemProps {
  packageName: string;
  onPackagePressed: (pacakgeName: string) => void;
}

export default function PackageListItem(props: PackageListItemProps) {
  return (
    <TouchableOpacity
      onPress={() => props.onPackagePressed(props.packageName)}
      style={{ paddingHorizontal: 16, paddingVertical: 8 }}
    >
      <Text>{props.packageName}</Text>
    </TouchableOpacity>
  );
}

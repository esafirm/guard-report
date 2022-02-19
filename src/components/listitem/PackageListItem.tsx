import { useMemo } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { generateTagsChips } from './Chip';

interface PackageListItemProps {
  packageName: string;
  tags: string[];
  onPackagePressed: (pacakgeName: string) => void;
}

export default function PackageListItem(props: PackageListItemProps) {
  const tags = useMemo(() => {
    return Array.from(new Set(props.tags)).sort();
  }, [props.tags]);

  return (
    <TouchableOpacity
      onPress={() => props.onPackagePressed(props.packageName)}
      style={{
        flex: 1,
        padding: 16,
        borderBottomColor: '#AAA',
        borderBottomWidth: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text>{props.packageName}</Text>
      {generateTagsChips(tags)}
    </TouchableOpacity>
  );
}

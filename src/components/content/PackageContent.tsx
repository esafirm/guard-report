import { FlatList } from 'react-native';
import PackageListItem from '../listitem/PackageListItem';
import { getPackageArray } from '../../datahandler';

interface PackageContentProps {
  filter: string;
  onPackageSelected: (packageName: string) => void;
}

export default function PackageContent(props: PackageContentProps) {
  const data = getPackageArray();
  const packages = Object.keys(data)
    .filter((k) => k.includes(props.filter))
    .map((key) => ({
      key: key,
      tags: data[key].flatMap((item) => item.tags),
    }));

  return (
    <FlatList
      data={packages}
      renderItem={(listItem) => (
        <PackageListItem
          packageName={listItem.item.key}
          tags={listItem.item.tags}
          onPackagePressed={props.onPackageSelected}
        />
      )}
    />
  );
}

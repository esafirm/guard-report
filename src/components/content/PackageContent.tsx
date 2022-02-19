import { FlatList } from 'react-native';
import PackageListItem from '../listitem/PackageListItem';
import { getPackageArray } from '../../datahandler';

interface PackageContentProps {
  filter: string;
  onPackageSelected: (packageName: string) => void;
}

export default function PackageContent(props: PackageContentProps) {
  const packages = Object.keys(getPackageArray()).filter((item) =>
    item.includes(props.filter)
  );

  return (
    <FlatList
      data={packages}
      renderItem={(listItem) => (
        <PackageListItem
          packageName={listItem.item}
          onPackagePressed={props.onPackageSelected}
        />
      )}
    />
  );
}

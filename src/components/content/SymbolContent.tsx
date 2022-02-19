import { FlatList } from 'react-native';
import { getPackageArray } from '../../datahandler';
import SymbolListItem from '../listitem/SymbolListItem';

interface PackageContentProps {
  filter: string;
  packageName: string;
  className: string;
}

export default function SymbolContent(props: PackageContentProps) {
  const parentClass = getPackageArray()[props.packageName].find(
    (i) => i.parent == props.className
  );
  const items = parentClass?.children ?? [];

  return (
    <FlatList
      data={items}
      renderItem={(listItem) => <SymbolListItem packageName={listItem.item} />}
    />
  );
}

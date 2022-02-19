import { FlatList } from 'react-native';
import PackageListItem from '../listitem/PackageListItem';
import { getPackageArray, JsonItem, NO_TAG } from '../../datahandler';
import { useMemo } from 'react';

interface PackageContentProps {
  filter: string;
  tagFilter: string[];
  onPackageSelected: (packageName: string) => void;
}

function filterByTags(items: JsonItem[], tagFilter: string[]): JsonItem[] {
  return items.filter((i) => {
    return i.tags.every((tag) => tagFilter.includes(tag));
  });
}

export default function PackageContent(props: PackageContentProps) {
  const data = getPackageArray();
  const filteredData = useMemo(
    () => Object.keys(data).filter((k) => k.includes(props.filter)),
    [props.filter]
  );
  const packages = filteredData
    .map((key) => ({
      key: key,
      tags: filterByTags(data[key], props.tagFilter).flatMap(
        (item) => item.tags
      ),
    }))
    .filter((i) => {
      if (i.tags.length === 0) {
        return props.tagFilter.includes(NO_TAG);
      } else {
        return true;
      }
    });

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

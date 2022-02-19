import { FlatList } from 'react-native';
import ClassListItem from '../listitem/ClassListItem';
import { getPackageArray, JsonItem, NO_TAG } from '../../datahandler';

interface ClassContentProps {
  filter: string;
  tagFilter: string[];
  packageName: string;
  onClassSelected: (className: string) => void;
}

function isShow(props: ClassContentProps, item: JsonItem): boolean {
  if (!item.parent.includes(props.filter)) {
    return false;
  }

  if (item.tags.length === 0) {
    return props.tagFilter.includes(NO_TAG);
  }

  return item.tags.every((tag) => props.tagFilter.includes(tag));
}

export default function ClassContent(props: ClassContentProps) {
  const classes = getPackageArray()[props.packageName].filter((item) =>
    isShow(props, item)
  );

  return (
    <FlatList
      data={classes}
      renderItem={(listItem) => (
        <ClassListItem
          item={listItem.item}
          onClassSelected={props.onClassSelected}
        />
      )}
    />
  );
}

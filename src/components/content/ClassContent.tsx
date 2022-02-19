import { FlatList } from 'react-native';
import ClassListItem from '../listitem/ClassListItem';
import { getPackageArray } from '../../datahandler';

interface ClassContentProps {
  filter: string;
  packageName: string;
  onClassSelected: (className: string) => void;
}

export default function ClassContent(props: ClassContentProps) {
  const classes = getPackageArray()[props.packageName].filter((item) =>
    item.parent.includes(props.filter)
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

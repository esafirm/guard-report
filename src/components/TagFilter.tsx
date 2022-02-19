import { View } from 'react-native';
// @ts-ignore
import { CheckBox } from 'react-native-web';
import Chip from './listitem/Chip';
import { getAvailableTags } from '../datahandler';
import Colors from '../utils/colors';

interface TagFilterProps {
  tagFilter: string[];
  onSetTagFilter: (filter: string[]) => void;
}

export default function TagFilter(props: TagFilterProps) {
  const avaialbleTags = getAvailableTags();

  return (
    <View>
      {avaialbleTags.map((tag) => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}
        >
          <Chip label={tag} style={{ flex: 1, marginEnd: 16 }} />
          <CheckBox
            color={Colors.BLUE}
            value={props.tagFilter.includes(tag)}
            onValueChange={(isChecked: boolean | 'mixed') => {
              if (isChecked) {
                props.onSetTagFilter([...props.tagFilter, tag]);
              } else {
                const newFilter = props.tagFilter.filter((f) => f != tag);
                props.onSetTagFilter(newFilter);
              }
            }}
          />
        </View>
      ))}
    </View>
  );
}

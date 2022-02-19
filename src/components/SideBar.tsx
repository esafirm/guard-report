import { useEffect, useState } from 'react';
import { TextInput, View, Text } from 'react-native';

import { useDebounce } from '../utils/hooks';

import { getAvailableTags } from '../datahandler';
import Chip from './listitem/Chip';

interface SideBarProps {
  onChangeFilter: (filter: string) => void;
  children: React.ReactNode;
}

export default function SideBar(props: SideBarProps) {
  const [internalFilter, setFilter] = useState('');
  const debouncedValue = useDebounce(internalFilter, 500);
  const avaialbleTags = getAvailableTags();

  useEffect(() => {
    props.onChangeFilter(debouncedValue);
  }, [debouncedValue]);

  return (
    <View
      style={{
        borderColor: 'black',
        borderStartWidth: 1,
        borderTopWidth: 1,
        padding: 16,
      }}
    >
      <TextInput
        style={{ padding: 8, borderWidth: 1 }}
        placeholder={'Filter'}
        onChangeText={(text) => setFilter(text)}
      />

      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          paddingVertical: 16,
        }}
      >
        Include tags:
      </Text>

      {props.children}
    </View>
  );
}

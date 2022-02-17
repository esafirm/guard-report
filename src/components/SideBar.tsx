import { useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';
import { useDebounce } from '../utils/hooks';

interface SideBarProps {
  onChangeFilter: (filter: string) => void;
}

export default function SideBar(props: SideBarProps) {
  const [internalFilter, setFilter] = useState('');
  const debouncedValue = useDebounce(internalFilter, 500);

  useEffect(() => {
		props.onChangeFilter(debouncedValue)
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
    </View>
  );
}

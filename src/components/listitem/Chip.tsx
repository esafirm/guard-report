import { ColorValue, Text } from 'react-native';

interface ChipProps {
  color: ColorValue;
  label: string;
  textColor?: ColorValue;
}

export default function Chip(props: ChipProps) {
  return (
    <Text
      style={{
        backgroundColor: props.color,
        borderRadius: 4,
        paddingHorizontal: 4,
        paddingTop: 2,
        fontWeight: '800',
				fontSize: 10,
        color: props.textColor ?? 'white',
      }}
    >
      {props.label.toUpperCase()}
    </Text>
  );
}

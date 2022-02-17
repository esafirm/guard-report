import { View, ViewStyle } from 'react-native';

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function Container(props: ContainerProps) {
  return (
    <View
      style={[
        {
          alignSelf: 'center',
          shadowRadius: 1,
          width: '100vh',
          minHeight: '100vh',
        },
        props.style,
      ]}
    >
      {props.children}
    </View>
  );
}

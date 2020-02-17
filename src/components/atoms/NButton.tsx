import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import {Colors, Typography} from '../../ressources';

const BUTTON_PADDING = 20;
const BUTTON_BORDER_RADIUS = 10;
const BUTTON_DISABLED_OPACITY = 0.5;
const BUTTON_ENABLED_OPACITY = 1;
const BUTTON_MAX_LINES = 1;
const BUTTON_SHADOW_OFFSET_WIDTH = 0;
const BUTTON_SHADOW_OFFSET_HEIGHT = 1;
const BUTTON_SHADOW_RADIUS = 3;
const BUTTON_SHADOW_OPACITY = 1;
const BUTTON_SHADOW_COLOR = '#rgba(17, 38, 87, 0.15)';

interface IProps {
  title: string;
  color?: string;
  backgroundColor?: string;
  disabled?: boolean;
  height?: number;
  width?: string | number;
  testID?: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}

const NButton: React.FC<IProps> = ({
  title,
  color = Colors.white,
  backgroundColor = Colors.primary,
  disabled = false,
  height,
  width,
  testID = '',
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          height,
          width,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
      testID={testID}>
      <View
        style={[
          styles.button,
          {
            opacity: disabled
              ? BUTTON_DISABLED_OPACITY
              : BUTTON_ENABLED_OPACITY,
            backgroundColor: backgroundColor,
            height,
            width,
          },
          !disabled && {
            shadowColor: BUTTON_SHADOW_COLOR,
            shadowOffset: {
              width: BUTTON_SHADOW_OFFSET_WIDTH,
              height: BUTTON_SHADOW_OFFSET_HEIGHT,
            },
            shadowRadius: BUTTON_SHADOW_RADIUS,
            shadowOpacity: BUTTON_SHADOW_OPACITY,
          },
        ]}>
        <Text
          style={[
            {...Typography.button},
            {
              color,
            },
          ]}
          numberOfLines={BUTTON_MAX_LINES}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BUTTON_BORDER_RADIUS,
    paddingLeft: BUTTON_PADDING,
    paddingRight: BUTTON_PADDING,
  },
});

export default NButton;

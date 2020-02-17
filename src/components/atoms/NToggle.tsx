import {
  Animated,
  TouchableWithoutFeedback,
  Easing,
  StyleSheet,
} from 'react-native';
import React, {useRef, useState, useDebugValue} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../ressources';

const TOGGLE_WIDTH = 200;

const colors = {
  coolGray50: Colors.ternary,
  blueLight2: Colors.primary,
  white: Colors.white,
  black: Colors.primaryText,
};

const NToggle = ({onPress, initialState}) => {
  const animation = useRef(new Animated.Value(initialState ? 1 : 0)).current;
  const [toggled, setToggled] = useState(initialState);
  const [containerWidth, setContainerWidth] = useState(
    initialState ? TOGGLE_WIDTH : 0,
  );

  useDebugValue(toggled ? 'on' : 'off');
  const marked = toggled ? 0 : 1;
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setToggled(!toggled);
        Animated.timing(animation, {
          duration: 300,
          toValue: marked,
          easing: Easing.ease,
        }).start();
        onPress(toggled);
      }}>
      <Animated.View
        style={dynamicStyles.container(animation)}
        onLayout={({
          nativeEvent: {
            layout: {width},
          },
        }) => setContainerWidth(width)}>
        <Animated.Text
          style={[
            dynamicStyles.text(true, animation),
            {color: toggled ? colors.white : colors.black},
          ]}>
          {toggled ? 'Read' : 'Cancel'}
        </Animated.Text>
        <Animated.View
          style={[
            styles.knob,
            {
              transform: [
                {
                  translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, containerWidth - 50],
                  }),
                },
              ],
            },
          ]}>
          <AnimatedIcon
            name={toggled ? 'nfc' : 'clear'}
            size={30}
            color={colors.blueLight2}
          />
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  knob: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 5,
    bottom: 0,
    left: 5,
    right: 0,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const dynamicStyles = {
  container: animation => ({
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.coolGray50, colors.blueLight2],
    }),
    borderRadius: 25,
    height: 50,
    width: TOGGLE_WIDTH,
  }),
  text: (inverted, animation) => ({
    fontWeight: '600',
  }),
  image: animation => ({
    height: 20,
    width: 20,
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1],
    }),
  }),
};

export default NToggle;

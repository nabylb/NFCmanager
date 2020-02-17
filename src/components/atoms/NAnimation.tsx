import React from 'react';
import LottieView from 'lottie-react-native';

interface IAnimationObject {
  v: string;
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  nm: string;
  ddd: number;
  assets: any[];
  layers: any[];
}

interface IProps {
  width?: string | number;
  height?: string | number;
  source: string | IAnimationObject;
  autoPlay: boolean | undefined;
  loop: boolean | undefined;
  duration?: number;
  onAnimationFinish?: ((isCancelled: boolean) => void) | undefined;
}

const NAnimation: React.FC<IProps> = ({
  width = 100,
  height = 100,
  source,
  autoPlay = true,
  loop = true,
  duration,
  onAnimationFinish = (isCancelled: boolean) => null,
}) => (
  <LottieView
    style={{
      width,
      height,
    }}
    source={source}
    autoPlay={autoPlay}
    loop={loop}
    duration={duration}
    onAnimationFinish={onAnimationFinish}
  />
);

export default NAnimation;

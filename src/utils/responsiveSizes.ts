import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 812;

// ✅ Always read fresh dimensions — never cache at module level
const getDimensions = () => Dimensions.get('window');

// ─── Device Type Checks (safe to cache — never change at runtime) ───────────
const { width: initialWidth, height: initialHeight } = Dimensions.get('window');

export const isiPAD = initialHeight / initialWidth < 1.6;
export const isTablet = initialHeight / initialWidth < 1.6;
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const isIphoneXorAbove = (): boolean => {
  const { width: w, height: h } = getDimensions();
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (h === 812 || w === 812 ||
     h === 896 || w === 896 ||
     w === 390 || h === 844 ||
     h === 852 || w === 428 ||
     h === 926 || h === 932)
  );
};

export const isX = isIphoneXorAbove();

// ─── Scaling Functions (always use live dimensions) ─────────────────────────

export const scale = (size: number): number => {
  const { width } = getDimensions();
  return (width / guidelineBaseWidth) * size;
};

export const verticalScale = (size: number): number => {
  const { height } = getDimensions();
  return (height / guidelineBaseHeight) * size;
};

export const moderateScale = (size: number, factor = 0.5): number =>
  size + (scale(size) - size) * factor;

export const moderateScaleVertical = (size: number, factor = 0.5): number =>
  size + (verticalScale(size) - size) * factor;

export const textScale = (
  fontSize: number,
  standardScreenHeight = 680
): number => {
  const { width, height } = getDimensions();
  const standardLength = width > height ? width : height;
  const offset =
    width > height
      ? 0
      : Platform.OS === 'ios'
      ? 78
      : StatusBar.currentHeight ?? 0;
  const deviceHeight =
    isIphoneXorAbove() || Platform.OS === 'android'
      ? standardLength - offset
      : standardLength;
  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
};

export const wp = (widthPercent: string | number): number => {
  const { width } = getDimensions();
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
};

export const hp = (heightPercent: string | number): number => {
  const { height } = getDimensions();
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
};

// ✅ Convenience getter for current orientation
export const isLandscape = (): boolean => {
  const { width, height } = getDimensions();
  return width > height;
};

// ✅ Re-export live width/height as functions, not frozen values
export const getWidth = (): number => getDimensions().width;
export const getHeight = (): number => getDimensions().height;
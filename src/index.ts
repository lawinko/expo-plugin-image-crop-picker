import { ConfigPlugin } from 'expo/config-plugins';
import { withAndroidImageCropPicker } from './android';
import { withIosImageCropPicker } from './ios';

/**
 * Expo Config Plugin for react-native-image-crop-picker.
 */
export const withImageCropPicker: ConfigPlugin = (config) => {
    config = withIosImageCropPicker(config);
    config = withAndroidImageCropPicker(config);
    return config;
};

export default withImageCropPicker;
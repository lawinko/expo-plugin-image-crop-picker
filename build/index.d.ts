import { ConfigPlugin } from "expo/config-plugins";
interface ImageCropPickerPluginProps {
    photosPermission?: string;
    cameraPermission?: string;
    microphonePermission?: string;
}
/**
 * Expo Config Plugin for react-native-image-crop-picker
 */
export declare const withImageCropPicker: ConfigPlugin<ImageCropPickerPluginProps | void>;
export default withImageCropPicker;

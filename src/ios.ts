import { ConfigPlugin, withInfoPlist } from '@expo/config-plugins';

/**
 * Adds required iOS permissions for image crop picker.
 */
export const withIosImageCropPicker: ConfigPlugin = (config) => {
    return withInfoPlist(config, (config) => {
        config.modResults.NSPhotoLibraryUsageDescription =
            config.modResults.NSPhotoLibraryUsageDescription ||
            'This app requires access to your photo library to upload images';

        config.modResults.NSCameraUsageDescription =
            config.modResults.NSCameraUsageDescription ||
            'This app requires access to your camera to take photos';

        config.modResults.NSMicrophoneUsageDescription =
            config.modResults.NSMicrophoneUsageDescription ||
            'This app requires access to your microphone for videos with audio';

        return config;
    });
};
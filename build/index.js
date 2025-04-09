"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withImageCropPicker = void 0;
const config_plugins_1 = require("expo/config-plugins");
/**
 * Expo Config Plugin for react-native-image-crop-picker
 */
const withImageCropPicker = (config, props = {}) => {
    const pluginProps = props || {};
    config = withIosImageCropPicker(config, pluginProps);
    config = withAndroidImageCropPicker(config);
    return config;
};
exports.withImageCropPicker = withImageCropPicker;
/**
 * iOS implementation
 */
const withIosImageCropPicker = (config, props) => {
    return (0, config_plugins_1.withInfoPlist)(config, (config) => {
        const { photosPermission, cameraPermission, microphonePermission } = props;
        config.modResults.NSPhotoLibraryUsageDescription =
            config.modResults.NSPhotoLibraryUsageDescription ||
                photosPermission ||
                "This app requires access to your photo library to upload images";
        config.modResults.NSCameraUsageDescription =
            config.modResults.NSCameraUsageDescription ||
                cameraPermission ||
                "This app requires access to your camera to take photos";
        config.modResults.NSMicrophoneUsageDescription =
            config.modResults.NSMicrophoneUsageDescription ||
                microphonePermission ||
                "This app requires access to your microphone for videos with audio";
        return config;
    });
};
/**
 * Android implementation
 */
const withAndroidImageCropPicker = (config) => {
    config = (0, config_plugins_1.withProjectBuildGradle)(config, (config) => {
        const mavenGoogle = "maven { url 'https://maven.google.com' }";
        const jitpack = "maven { url 'https://www.jitpack.io' }";
        if (!config.modResults.contents.includes(mavenGoogle)) {
            config.modResults.contents = config.modResults.contents.replace(/allprojects[\s\S]*?repositories[\s\S]*?\{/, (match) => `${match}\n        // Added by plugin\n        ${mavenGoogle}\n        ${jitpack}`);
        }
        config.modResults.contents = config.modResults.contents.replace(/compileSdkVersion\s*=\s*\d+/g, "compileSdkVersion = 33");
        config.modResults.contents = config.modResults.contents.replace(/targetSdkVersion\s*=\s*\d+/g, "targetSdkVersion = 33");
        return config;
    });
    config = (0, config_plugins_1.withAppBuildGradle)(config, (config) => {
        if (!config.modResults.contents.includes("vectorDrawables.useSupportLibrary = true")) {
            config.modResults.contents = config.modResults.contents.replace(/defaultConfig\s*\{/, `defaultConfig {\n        // Added by plugin\n        vectorDrawables.useSupportLibrary = true`);
        }
        return config;
    });
    config = (0, config_plugins_1.withAndroidManifest)(config, (config) => {
        var _a, _b, _c;
        var _d, _e;
        const androidManifest = config.modResults;
        // Ensure <uses-permission android:name="android.permission.CAMERA" /> is added
        const hasCameraPermission = (_a = androidManifest.manifest["uses-permission"]) === null || _a === void 0 ? void 0 : _a.some((item) => item.$["android:name"] === "android.permission.CAMERA");
        if (!hasCameraPermission) {
            (_b = (_d = androidManifest.manifest)["uses-permission"]) !== null && _b !== void 0 ? _b : (_d["uses-permission"] = []);
            androidManifest.manifest["uses-permission"].push({
                $: { "android:name": "android.permission.CAMERA" },
            });
        }
        // Create uses-feature array if it doesn't exist
        (_c = (_e = androidManifest.manifest)["uses-feature"]) !== null && _c !== void 0 ? _c : (_e["uses-feature"] = []);
        const features = androidManifest.manifest["uses-feature"];
        const ensureFeature = (name) => {
            if (!features.some((feature) => feature.$["android:name"] === name)) {
                features.push({
                    $: {
                        "android:name": name,
                        "android:required": "false",
                    },
                });
            }
        };
        ensureFeature("android.hardware.camera");
        ensureFeature("android.hardware.camera.front");
        return config;
    });
    return config;
};
exports.default = exports.withImageCropPicker;
//# sourceMappingURL=index.js.map
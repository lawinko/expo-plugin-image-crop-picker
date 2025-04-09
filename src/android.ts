import {
    ConfigPlugin,
    withProjectBuildGradle,
    withAppBuildGradle,
    withAndroidManifest,
} from '@expo/config-plugins';

/**
 * Adds Android permissions and gradle settings for image crop picker.
 */
export const withAndroidImageCropPicker: ConfigPlugin = (config) => {
    config = withProjectBuildGradle(config, (config) => {
        const mavenRepos = `maven { url 'https://maven.google.com' }\nmaven { url 'https://www.jitpack.io' }`;

        if (!config.modResults.contents.includes(mavenRepos)) {
            config.modResults.contents = config.modResults.contents.replace(
                /allprojects[\s\S]*?repositories[\s\S]*?\{/,
                (match) => `${match}\n        // Added by plugin\n        ${mavenRepos}`
            );
        }

        config.modResults.contents = config.modResults.contents
            .replace(/compileSdkVersion\s*=\s*\d+/g, 'compileSdkVersion = 33')
            .replace(/targetSdkVersion\s*=\s*\d+/g, 'targetSdkVersion = 33');

        return config;
    });

    config = withAppBuildGradle(config, (config) => {
        if (!config.modResults.contents.includes('vectorDrawables.useSupportLibrary = true')) {
            config.modResults.contents = config.modResults.contents.replace(
                /defaultConfig\s*\{/,
                `defaultConfig {\n        // Added by plugin\n        vectorDrawables.useSupportLibrary = true`
            );
        }
        return config;
    });

    config = withAndroidManifest(config, (config) => {
        const manifest = config.modResults;

        manifest.manifest['uses-permission'] ??= [];
        const permissions = manifest.manifest['uses-permission'];

        if (!permissions.some((item) => item.$['android:name'] === 'android.permission.CAMERA')) {
            permissions.push({ $: { 'android:name': 'android.permission.CAMERA' } });
        }

        manifest.manifest['uses-feature'] ??= [];
        const features = manifest.manifest['uses-feature'];

        const ensureFeature = (name: string) => {
            if (!features.some((f) => f.$['android:name'] === name)) {
                features.push({ $: { 'android:name': name, 'android:required': 'false' } });
            }
        };

        ensureFeature('android.hardware.camera');
        ensureFeature('android.hardware.camera.front');

        return config;
    });

    return config;
};
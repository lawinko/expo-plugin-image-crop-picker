# Expo Config Plugin: react-native-image-crop-picker

This plugin configures iOS and Android native files to support `react-native-image-crop-picker` in Expo prebuild projects.

## Installation

```bash
npm install expo-image-crop-picker-plugin
```

Add to your `app.config.js`:

```ts
import withImageCropPicker from 'expo-image-crop-picker-plugin';

export default withImageCropPicker({
  name: 'MyApp',
  slug: 'my-app',
});
```

## What it does

### iOS:
- Adds `NSCameraUsageDescription`, `NSPhotoLibraryUsageDescription`, and `NSMicrophoneUsageDescription` to Info.plist.

### Android:
- Sets `compileSdkVersion` and `targetSdkVersion` to 33.
- Adds camera permission and optional camera hardware features.
- Enables vector drawable support.
- Adds Maven repositories.

## Build
```bash
npm run build
```

## Contributing
Pull requests are welcome! Please follow the existing coding style and add JSDoc to any new functions.

## License
MIT

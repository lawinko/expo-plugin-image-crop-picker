# Expo Config Plugin: react-native-image-crop-picker

This plugin configures iOS and Android native files to support `react-native-image-crop-picker` in Expo prebuild projects.

## Installation

```bash
yarn add expo-plugin-image-crop-picker
```

Add to your `app.config.js` or `app.json`:

```json
{
  "expo": {
    "name": "MyApp",
    "slug": "my-app",
    "plugins": [
      "expo-plugin-image-crop-picker"
    ]
  }
}
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
yarn build
```

## Contributing
Pull requests are welcome! Please follow the existing coding style and add JSDoc to any new functions.

## License
MIT

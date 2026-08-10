/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { createMMKV } from 'react-native-mmkv';
export const storage = createMMKV();
AppRegistry.registerComponent(appName, () => App);


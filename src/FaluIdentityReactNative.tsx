import { NativeModules, Platform } from 'react-native';
import type { InitializeVerificationView, PresentVerificationView } from './types';

const LINKING_ERROR =
    `The package 'falu-identity-react-native' doesn't seem to be linked. Make sure: \n\n` +
    Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
    '- You rebuilt the app after installing the package\n' +
    '- You are not using Expo Go\n';

const FaluIdentityReactNative = NativeModules.FaluIdentityReactNative
    ? NativeModules.FaluIdentityReactNative
    : new Proxy(
        {},
        {
            get() {
                throw new Error(LINKING_ERROR);
            },
        }
    );

type FaluIdentity = {
    initialize: InitializeVerificationView;
    open: PresentVerificationView;
};

export default FaluIdentityReactNative as FaluIdentity;

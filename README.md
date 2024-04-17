# Falu Identity React Native

Welcome to the official documentation for Falu's React Native SDK for identity verification.

## Getting Started

To begin integrating Falu's identity verification SDK into your React Native app, follow our [📚 integration guides](https://falu.io/docs/identity) and explore our example project.

## Usage

You have two options for initializing the Falu Identity SDK in your React Native app.

### Using the `useFaluIdentity` Hook

Utilize the provided `useFaluIdentity` hook in your functional components.

```tsx
// IdentityVerificationScreen.tsx
import { useFaluIdentity } from '@falu/react-native-identity';

const IdentityVerificationScreen = () => {
  const verificationContract = async () => {
    const response = await createIdentityVerification();

    return {
      verification: response.id,
      temporaryKey: response.temporary_key,
      logo: Image.resolveAssetSource({ uri: 'place/logo/uri/here' }),
    };
  };

  const { open, result, loading } = useFaluIdentity(verificationContract);

  const startVerification = useCallback(() => {
    open();
  }, [open]);

  return (
    <View>
      <Button title="Verify Identity" onPress={startVerification} />
      <Text>Result: {result?.type}</Text>
    </View>
  );
};
```

### Custom implementation

Alternatively, you can create your own implementation without using the hook.

```tsx
// IdentityVerificationScreen.tsx
import { openIdentityVerificationView } from '@falu/react-native-identity';

const IdentityVerificationScreen = () => {
  const verificationContract = async () => {
    const response = await createIdentityVerification();

    return {
      verification: response.id,
      temporaryKey: response.temporary_key,
      logo: Image.resolveAssetSource({ uri: 'place/logo/uri/here' }),
    };
  };

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const open = async () => {
    setLoading(true);
    const contract = await verificationContract();
    setLoading(false);
    const verificationResult = await openIdentityVerificationView(contract);
    setResult(verificationResult);
  };

  const startVerification = async () => {
    open();
  };

  const loadingButton = useCallback(() => {
    if (loading) {
      return <ActivityIndicator />;
    }
    <Button title="Verify Identity" onPress={startVerification} />;
  }, [loading, startVerification]);

  return (
    <View style={styles.container}>
      <View>{loadingButton()}</View>
      <Text>Result: {result?.type ?? ''}</Text>
    </View>
  );
};
```

## Running the Example App

To run the example app:

- Navigate to the root folder and execute:
`cd example/identity && pnpm start`
- Run the example app on a specific simulator/emulator:
- - For iOS: `pnpm example ios`
- - `For Android: pnpm example android`

- Alternatively, navigate to the example/identity folder and run:
- - For iOS: `pnpm ios`
- - For Android: `pnpm android`

This should give you a good starting point for integrating Falu's identity verification SDK into your React Native app.

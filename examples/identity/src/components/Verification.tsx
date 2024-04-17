import { openIdentityVerificationView, type IdentityVerificationResult } from '@falu/react-native-identity';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, Image, StyleSheet, Text, View } from 'react-native';
import { createIdentityVerification } from '../api';
import { AllowedType, VerificationType, type VerificationOptionTypes, type VerificationOptions } from '../types';

interface VerificationProps {
  optionsTypes: VerificationOptionTypes;
}

const Verification = ({ optionsTypes }: VerificationProps) => {
  const [result, setResult] = useState<IdentityVerificationResult | undefined>();
  const [loading, setLoading] = useState(false);

  const verificationContract = async () => {
    const verification = await createIdentityVerification(VerificationType.DOCUMENT, options);

    return {
      verification: verification.id,
      temporaryKey: verification.temporary_key,
      logo: Image.resolveAssetSource({ uri: 'https://files.falu.io/v1/public/file_2DW3lX2XRPBWWSIgoCt3OLaclZ0' }),
    };
  };

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
    return <Button title="Verify Identity" onPress={startVerification} />;
  }, [loading, startVerification]);

  const options: VerificationOptions = {
    allow_uploads: optionsTypes.allowUploads,
    id_number: optionsTypes.allowIdNumberVerification ? {} : undefined,
    document: generateDocumentOptions(
      optionsTypes.allowDrivingLicense,
      optionsTypes.allowPassport,
      optionsTypes.allowIdentityCard,
    ),
    selfie: optionsTypes.allowDocumentSelfie ? {} : undefined,
  };

  function generateDocumentOptions(
    allowDrivingLicense: boolean,
    allowPassport: boolean,
    allowIdentityCard: boolean,
  ): { allowed: AllowedType[] } | undefined {
    if (!allowDrivingLicense && !allowPassport && !allowIdentityCard) {
      return undefined;
    }

    const allowed: AllowedType[] = [];
    if (allowDrivingLicense) allowed.push(AllowedType.DRIVING_LICENSE);
    if (allowPassport) allowed.push(AllowedType.PASSPORT);
    if (allowIdentityCard) allowed.push(AllowedType.ID_CARD);

    return { allowed: allowed };
  }

  return (
    <View style={styles.container}>
      <View>{loadingButton()}</View>
      <Text>Result: {result?.type ?? ''}</Text>
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    height: 50,
  },
});

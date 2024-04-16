import { openIdentityVerificationView, type IdentityVerificationResult } from '@falu/react-native-identity';
import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { createIdentityVerification } from '../api';
import { AllowedType, VerificationType, type VerificationOptionTypes, type VerificationOptions } from '../types';

interface VerificationProps {
  optionsTypes: VerificationOptionTypes;
}

const Verification = ({ optionsTypes }: VerificationProps) => {
  const [result, setResult] = useState<IdentityVerificationResult | undefined>();

  const startVerification = async () => {
    const verification = await createIdentityVerification(VerificationType.DOCUMENT, options);

    const contract = {
      verification: verification.id,
      temporaryKey: verification.temporary_key,
      logo: Image.resolveAssetSource({ uri: "https://files.falu.io/v1/public/file_2DW3lX2XRPBWWSIgoCt3OLaclZ0" }),
    };

    const verificationResult = await openIdentityVerificationView(contract);
    setResult(verificationResult);
  };

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
      <Button title="Verify Identity" onPress={startVerification} />
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

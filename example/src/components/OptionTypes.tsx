import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { VerificationOptionTypes } from '../types';
import OptionType from './OptionType';

interface OptionTypesProps {
  optionTypes: VerificationOptionTypes;
  setOptionTypes(options: VerificationOptionTypes): void;
}

const OptionTypes = ({ optionTypes, setOptionTypes }: OptionTypesProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Available Document Types</Text>

        <OptionType
          title="Driver License"
          value={optionTypes.allowDrivingLicense}
          onChange={(value) => {
            setOptionTypes({ ...optionTypes, allowDrivingLicense: value });
          }}
        />
        <OptionType
          title="Passport"
          value={optionTypes.allowPassport}
          onChange={(value) => {
            setOptionTypes({ ...optionTypes, allowPassport: value });
          }}
        />
        <OptionType
          title="Identity Card"
          value={optionTypes.allowIdentityCard}
          onChange={(value) => {
            setOptionTypes({ ...optionTypes, allowIdentityCard: value });
          }}
        />
      </View>

      <Text style={styles.title}>Available Document Types</Text>

      <OptionType
        title="Use Document and Selfie"
        value={optionTypes.allowDocumentSelfie}
        onChange={(value) => {
          setOptionTypes({ ...optionTypes, allowDocumentSelfie: value });
        }}
      />
      <OptionType
        title="Allow uploads"
        value={optionTypes.allowUploads}
        onChange={(value) => {
          setOptionTypes({ ...optionTypes, allowUploads: value });
        }}
      />
      <OptionType
        title="Verify ID Number"
        value={optionTypes.allowIdNumberVerification}
        onChange={(value) => {
          setOptionTypes({ ...optionTypes, allowIdNumberVerification: value });
        }}
      />
    </View>
  );
};

export default OptionTypes;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 16,
  },
  title: {
    paddingVertical: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 2,
    paddingHorizontal: 8,
  },
});

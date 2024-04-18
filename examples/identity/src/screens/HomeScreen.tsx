import React, { useState } from 'react';

import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import OptionTypes from '../components/OptionTypes';
import Verification from '../components/Verification';
import type { VerificationOptionTypes } from '../types';

const HomeScreen = () => {
  const [optionTypes, setOptionTypes] = useState<VerificationOptionTypes>({
    allowDrivingLicense: true,
    allowPassport: true,
    allowIdentityCard: true,
    allowUploads: false,
    allowDocumentSelfie: false,
    allowIdNumberVerification: false,
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <OptionTypes optionTypes={optionTypes} setOptionTypes={setOptionTypes} />
        <Verification optionsTypes={optionTypes} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollView: {
    marginHorizontal: 0,
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});

import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

type OptionType = {
  title: string;
  value: boolean;
  onChange(value: boolean): void;
};

const OptionType = ({ title, value, onChange }: OptionType) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <Switch value={value} onValueChange={onChange} />
    </View>
  );
};

export default OptionType;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

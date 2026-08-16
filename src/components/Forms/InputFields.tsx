import { StyleSheet, TextInput, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@react-native-vector-icons/ionicons';

type InputFieldProps = {
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  placeholder: string;
  value: string | number;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  onBlur?: () => void;

  // Add this
  keyboardType?: React.ComponentProps<typeof TextInput>['keyboardType'];
};

const InputFields = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  onBlur,
  keyboardType,
}: InputFieldProps) => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  return (
    <View style={styles.container}>

      {icon && (
        <Ionicons
          name={icon}
          size={22}
          color="#ccc"
          style={styles.leftIcon}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={String(value)}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry ? hidePassword : false}
        onBlur={onBlur}
        keyboardType={keyboardType}
      />

      {secureTextEntry && (
        <Pressable onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? 'eye-off' : 'eye'}
            size={22}
            color="#888"
          />
        </Pressable>
      )}

    </View>
  );
};

export default InputFields;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 5,
  },

  leftIcon: {
    marginRight: 6,
  },

  input: {
    flex: 1,
  },
});
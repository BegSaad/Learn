import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import styles from './styles';

const MailIcon = (props: any) => <Ionicons name="mail-outline" size={22} {...props} />;
const LockIcon = (props: any) => <Ionicons name="lock-closed-outline" size={22} {...props} />;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <Text style={styles.headerText}>Go and Learn</Text>

        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          left={
            <TextInput.Icon
              icon={MailIcon}
            />
          }
          style={styles.input}
        />

        <TextInput
          label="Password"
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          left={
            <TextInput.Icon
              icon={LockIcon}
            />
          }
          style={styles.input}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
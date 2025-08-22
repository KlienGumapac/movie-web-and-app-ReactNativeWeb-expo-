import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { CustomTextInput } from '../components/CustomTextInput';
import { CustomButton } from '../components/CustomButton';
import { COLORS } from '../constants/colors';
import { validateLoginForm } from '../utils/validation';
import { LoginFormData } from '../types/auth';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onSignUp: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onSignUp }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
   
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleLogin = async () => {
    console.log('Login attempt:', { email: formData.email, passwordLength: formData.password.length });
    
    const validation = validateLoginForm(formData.email, formData.password);
    console.log('Validation result:', validation);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      Alert.alert('Validation Error', validation.errors.join('\n'));
      return;
    }

    setIsLoading(true);
    console.log('Starting login process...');
    
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login timeout completed');
      
      if (formData.email && formData.password.length >= 6) {
        console.log('Login successful, calling onLoginSuccess');
        onLoginSuccess();
      } else {
        console.log('Login failed - invalid credentials');
        Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
      }
    }, 1500);
  };

  const handleSignUp = () => {
    onSignUp();
  };

  const handleButtonPress = () => {
    console.log('Button pressed');
    handleLogin();
  };

  const handleTestLogin = () => {
    console.log('Test login button pressed');
    Alert.alert('Test', 'Test button works!');
    onLoginSuccess();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
         
            <View style={styles.header}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>
                Sign in to your account to continue
              </Text>
            </View>

            <View style={styles.form}>
              <CustomTextInput
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.find(error => error.includes('email'))}
              />

              <CustomTextInput
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.find(error => error.includes('password'))}
              />

              <CustomButton
                title="Sign In"
                onPress={handleButtonPress}
                loading={isLoading}
                disabled={isLoading}
                style={styles.loginButton}
              />

              <TouchableOpacity
                style={styles.testButton}
                onPress={handleTestLogin}
                activeOpacity={0.8}
              >
                <Text style={styles.testButtonText}>Test Login (Skip Form)</Text>
              </TouchableOpacity>

              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account? </Text>
                <CustomButton
                  title="Sign Up"
                  variant="outline"
                  onPress={handleSignUp}
                  style={styles.signUpButton}
                />
              </View>
            </View>

            <View style={styles.demoInfo}>
              <Text style={styles.demoTitle}>Demo Credentials</Text>
              <Text style={styles.demoText}>
                Enter any valid email and password (min 6 characters) to login
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  card: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 32,
    shadowColor: COLORS.shadowDark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    marginBottom: 24,
  },
  loginButton: {
    marginTop: 8,
  },
  testButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  testButtonText: {
    color: COLORS.background,
    fontSize: 14,
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  signUpText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  signUpButton: {
    minWidth: 80,
    height: 40,
  },
  demoInfo: {
    backgroundColor: COLORS.backgroundLight,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  demoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
}); 
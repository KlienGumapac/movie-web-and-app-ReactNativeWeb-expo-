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
} from 'react-native';
import { CustomTextInput } from '../components/CustomTextInput';
import { CustomButton } from '../components/CustomButton';
import { COLORS } from '../constants/colors';
import { validateSignUpForm } from '../utils/validation';
import { SignUpFormData } from '../types/auth';

interface SignUpScreenProps {
  onSignUpSuccess: () => void;
  onBackToLogin: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ 
  onSignUpSuccess, 
  onBackToLogin 
}) => {
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof SignUpFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
 
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSignUp = async () => {
    const validation = validateSignUpForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      Alert.alert(
        'Success!',
        'Account created successfully! You can now sign in.',
        [
          {
            text: 'Sign In',
            onPress: onSignUpSuccess,
          }
        ]
      );
    }, 1500);
  };

  const handleBackToLogin = () => {
    onBackToLogin();
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
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>
                Join us and start exploring amazing movies
              </Text>
            </View>

            <View style={styles.form}>
            
              <View style={styles.nameRow}>
                <View style={styles.nameField}>
                  <CustomTextInput
                    label="First Name"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChangeText={(value) => handleInputChange('firstName', value)}
                    autoCapitalize="words"
                    autoCorrect={false}
                    error={errors.find(error => error.includes('first name'))}
                  />
                </View>
                <View style={styles.nameField}>
                  <CustomTextInput
                    label="Last Name"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChangeText={(value) => handleInputChange('lastName', value)}
                    autoCapitalize="words"
                    autoCorrect={false}
                    error={errors.find(error => error.includes('last name'))}
                  />
                </View>
              </View>

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
                placeholder="Create a password"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.find(error => error.includes('password') && !error.includes('confirm'))}
              />

              <CustomTextInput
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.find(error => error.includes('confirm'))}
              />

              <CustomButton
                title="Create Account"
                onPress={handleSignUp}
                loading={isLoading}
                disabled={isLoading}
                style={styles.signUpButton}
              />

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <CustomButton
                  title="Sign In"
                  variant="outline"
                  onPress={handleBackToLogin}
                  style={styles.loginButton}
                />
              </View>
            </View>

            <View style={styles.termsInfo}>
              <Text style={styles.termsTitle}>Terms & Conditions</Text>
              <Text style={styles.termsText}>
                By creating an account, you agree to our Terms of Service and Privacy Policy.
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
    maxWidth: 450,
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
  nameRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  nameField: {
    flex: 1,
  },
  signUpButton: {
    marginTop: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  loginButton: {
    minWidth: 80,
    height: 40,
  },
  termsInfo: {
    backgroundColor: COLORS.backgroundLight,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  termsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  termsText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
}); 
import { StyleSheet } from 'react-native';

const getSignUpScreenStyles = (colors) => StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    width: '85%',
    padding: 25,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.subtleText,
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: colors.background,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: colors.text,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
  signupButton: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signupButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.theme === 'dark' ? colors.background : '#fff',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  footerText: {
    fontSize: 14,
    color: colors.subtleText,
  },
  loginLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default getSignUpScreenStyles;


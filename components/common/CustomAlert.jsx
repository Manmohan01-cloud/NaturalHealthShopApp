import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../contexts/themeContext';

const CustomAlert = ({ isVisible, onClose, title, message, type = 'success', onConfirm }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  if (!isVisible) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  const renderIcon = () => {
      let iconColor = theme.primary;
      let iconName = 'check-circle';
      
      switch(type) {
        case 'success':
            iconName = 'check-circle';
            iconColor = '#27ae60';
            break;
        case 'info':
            iconName = 'info';
            iconColor = '#3498db';
            break;
        case 'confirm':
            iconName = 'alert-triangle';
            iconColor = '#f39c12';
            break;
        case 'error':
            iconName = 'x-circle';
            iconColor = '#e74c3c';
            break;
        default:
            break;
      }
      return <Feather name={iconName} size={40} color={iconColor} />;
  }

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.iconContainer}>
            {renderIcon()}
          </View>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{message}</Text>

          {type === 'confirm' ? (
            <View style={styles.confirmButtons}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                    <Text style={[styles.textStyle, styles.cancelText]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleConfirm}>
                    <Text style={[styles.textStyle, styles.confirmText]}>Confirm</Text>
                </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={[styles.button, styles.okButton]} onPress={onClose}>
              <Text style={styles.textStyle}>OK</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const getStyles = (colors) => StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingTop: 25,
    paddingBottom: 20,
    paddingHorizontal: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
  },
  iconContainer: {
    marginBottom: 20,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 2,
    marginTop: 15,
    alignItems: 'center'
  },
   okButton: {
    backgroundColor: colors.primary,
    width: '100%',
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    color: '#fff'
  },
  modalTitle: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontSize: 16,
      lineHeight: 22,
      color: colors.subtleText,
  },
  confirmButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 20,
  },
  cancelButton: {
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
      flex: 1,
      marginRight: 10,
  },
  confirmButton: {
      backgroundColor: '#e74c3c',
      flex: 1,
      marginLeft: 10,
  },
  cancelText: {
      color: colors.text,
  },
  confirmText: {
      color: '#fff',
  }
});

export default CustomAlert;
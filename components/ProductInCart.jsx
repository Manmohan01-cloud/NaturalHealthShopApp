import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/themeContext';
import { CART_ACTIONS, useCart } from '../contexts/cartContext';
import { useAlert } from '../contexts/AlertContext';

const ProductInCart = ({ product }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { dispatch } = useCart();
  const { showAppAlert } = useAlert();

  const handleIncrement = () => {
    dispatch({ type: CART_ACTIONS.INCREMENT_QUANTITY, payload: { id: product.id } });
  };

  const handleDecrement = () => {
    dispatch({ type: CART_ACTIONS.DECREMENT_QUANTITY, payload: { id: product.id } });
  };

  const confirmRemove = () => {
    showAppAlert({
      type: 'confirm',
      title: 'Remove Item',
      message: `Are you sure you want to remove ${product.title} from your cart?`,
      onConfirm: () => dispatch({ type: CART_ACTIONS.REMOVE_FROM_CART, payload: { id: product.id } }),
    });
  };

  const totalPrice = (product.price * product.quantity).toFixed(2);
  const imageSource = product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{product.title}</Text>
        <Text style={styles.productPrice}>₹{product.price.toFixed(2)} x {product.quantity}</Text>
        <Text style={styles.totalPrice}>Total: ₹{totalPrice}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={[styles.quantityButton, styles.decrementButton]} onPress={handleDecrement} activeOpacity={0.7}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <View style={styles.quantityDisplay}>
          <Text style={styles.quantityText}>{product.quantity}</Text>
        </View>
        <TouchableOpacity style={[styles.quantityButton, styles.incrementButton]} onPress={handleIncrement} activeOpacity={0.7}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={confirmRemove} activeOpacity={0.7}>
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (colors) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.card,
        padding: 16,
        marginVertical: 6,
        marginHorizontal: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: colors.theme === 'dark' ? 0.3 : 0.1,
        shadowRadius: 2,
        elevation: 3,
        alignItems: 'center',
    },
    productImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
        backgroundColor: colors.background,
    },
    productInfo: {
        flex: 1,
        marginLeft: 16,
        marginRight: 8,
    },
    productName: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 14,
        color: colors.subtleText,
        marginBottom: 4,
    },
    totalPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        borderRadius: 8,
        marginRight: 8,
    },
    quantityButton: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
    },
    decrementButton: { backgroundColor: '#ff6b6b' },
    incrementButton: { backgroundColor: '#51cf66' },
    buttonText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
    quantityDisplay: {
        minWidth: 36,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.card,
        borderRadius: 4,
        marginHorizontal: 2,
    },
    quantityText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    removeButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: colors.theme === 'dark' ? '#ff475740' : '#ff475720',
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeButtonText: { fontSize: 20, fontWeight: 'bold', color: '#ff4757' },
});

export default ProductInCart;
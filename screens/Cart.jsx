import React from 'react';
import { FlatList, StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CART_ACTIONS, useCart } from '../contexts/cartContext';
import ProductInCart from '../components/ProductInCart';
import { useTheme } from '../contexts/themeContext';

const Cart = ({ navigation }) => {
  const { shoppingCart, dispatch } = useCart();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > (shoppingCart.find(item => item.id === id)?.quantity || 0)) {
        dispatch({ type: CART_ACTIONS.INCREMENT_QUANTITY, payload: { id } });
    } else {
        dispatch({ type: CART_ACTIONS.DECREMENT_QUANTITY, payload: { id } });
    }
  };

  const handleRemove = (id) => {
    dispatch({ type: CART_ACTIONS.REMOVE_FROM_CART, payload: { id } });
  };

  const subtotal = shoppingCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = subtotal > 0 ? 50 : 0;
  const total = subtotal + shippingFee;

  const handleCheckout = () => {
      navigation.navigate('Home', { screen: 'Checkout' });
  };

  if (shoppingCart.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Feather name="shopping-cart" size={80} color="#ccc" />
        <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
        <Text style={styles.emptySubtitle}>Looks like you haven't added anything to your cart yet.</Text>
        <TouchableOpacity style={styles.shopNowButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.shopNowButtonText}>Shop Now</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>
      <FlatList
        data={shoppingCart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductInCart
            product={item}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
          />
        )}
        contentContainerStyle={styles.list}
      />
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>₹{subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping Fee</Text>
          <Text style={styles.summaryValue}>₹{shippingFee.toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹{total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const getStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: colors.card,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.text,
    },
    list: {
        paddingVertical: 10,
    },
    summaryContainer: {
        padding: 20,
        backgroundColor: colors.card,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopWidth: 1,
        borderColor: colors.border,
        elevation: 5,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: colors.text,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    summaryLabel: {
        fontSize: 16,
        color: colors.subtleText,
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 10,
        marginTop: 5,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
    },
    checkoutButton: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    checkoutButtonText: {
        color: colors.theme === 'dark' ? colors.background : '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        paddingHorizontal: 20,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        color: colors.text,
    },
    emptySubtitle: {
        fontSize: 16,
        color: colors.subtleText,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 30,
    },
    shopNowButton: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    shopNowButtonText: {
        color: colors.theme === 'dark' ? colors.background : '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Cart;
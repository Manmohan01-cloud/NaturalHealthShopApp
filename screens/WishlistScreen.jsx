import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useWishlist, WISHLIST_ACTIONS } from '../contexts/wishlistContext';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../contexts/themeContext';

const WishlistScreen = ({ navigation }) => {
  const { wishlist, dispatch } = useWishlist();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handleRemove = (item) => {
    dispatch({ type: WISHLIST_ACTIONS.REMOVE_FROM_WISHLIST, payload: { id: item.id } });
  };

  if (wishlist.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Feather name="heart" size={80} color="#ccc" />
        <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
        <Text style={styles.emptySubtitle}>Tap the heart on any product to save it here.</Text>
        <TouchableOpacity 
            style={styles.shopNowButton} 
            onPress={() => navigation.navigate('Home', { screen: 'LandingPage' })}
        >
            <Text style={styles.shopNowButtonText}>Discover Products</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Wishlist</Text>
      </View>
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={item.images[0]} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.productPrice}>₹{item.price}</Text>
            </View>
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(item)}>
                <Feather name="x" size={20} color="#e74c3c" />
            </TouchableOpacity>
          </View>
        )}
      />
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
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  productInfo: {
    flex: 1,
    marginLeft: 15,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  productPrice: {
    fontSize: 15,
    color: colors.primary,
    marginTop: 4,
  },
  removeButton: {
    padding: 10,
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

export default WishlistScreen;
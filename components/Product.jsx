import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import getProductStyles from "../styles/productStyles";
import { Feather } from '@expo/vector-icons';
import { CART_ACTIONS, useCart } from '../contexts/cartContext';
import { WishlistContext, WISHLIST_ACTIONS } from '../contexts/wishlistContext';
import { useTheme } from '../contexts/themeContext';
import { useAlert } from '../contexts/AlertContext'; 

const Product = (props) => {
  const { id, images, title, category, onPress } = props;
  const { theme } = useTheme();
  const productStyles = getProductStyles(theme);

  const { shoppingCart, dispatch: cartDispatch } = useCart();
  const { wishlist, dispatch: wishlistDispatch } = useContext(WishlistContext);
  const { showAppAlert } = useAlert(); 
  
  const isWishlisted = wishlist.some(item => item.id === id);

  const handleAddToCart = () => {
    const wasAlreadyInCart = shoppingCart.some(item => item.id === id);
    cartDispatch({ type: CART_ACTIONS.ADD_TO_CART, payload: props });

    if (wasAlreadyInCart) {
        showAppAlert({title: 'Quantity Updated', message: `${title} quantity has been increased in your cart.`, type: 'info'});
    } else {
        showAppAlert({title: 'Success!', message: `${title} has been added to your cart.`, type: 'success'});
    }
  };

  const handleToggleWishlist = () => {
    const wasAlreadyInWishlist = wishlist.some(item => item.id === id);
    wishlistDispatch({
        type: WISHLIST_ACTIONS.TOGGLE_WISHLIST_ITEM,
        payload: props
    });
    if (wasAlreadyInWishlist) {
      showAppAlert({title: 'Removed', message: `${title} removed from wishlist.`, type: 'info'});
    } else {
      showAppAlert({title: 'Added!', message: `${title} added to wishlist.`, type: 'success'});
    }
  };

  const imageSource = images && images.length > 0 ? images[0] : null;

  return (
    <View style={productStyles.container}>
      <TouchableOpacity style={productStyles.wishlistButton} onPress={handleToggleWishlist}>
        <Feather name="heart" size={18} color={isWishlisted ? '#e74c3c' : '#ccc'} fill={isWishlisted ? '#e74c3c' : 'none'}/>
      </TouchableOpacity>
      
      <TouchableOpacity style={productStyles.touchable} onPress={onPress} activeOpacity={0.8}>
        <View style={productStyles.imageContainer}>
          <Image source={imageSource} style={productStyles.image} />
        </View>

        <View style={productStyles.contentContainer}>
          <Text style={productStyles.category}>{category?.toUpperCase()}</Text>
          <Text style={productStyles.title} numberOfLines={2}>{title}</Text>
          <Text style={productStyles.price}>₹{props.price}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={productStyles.addToCartButton} onPress={handleAddToCart}>
        <Feather name="plus" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Product;
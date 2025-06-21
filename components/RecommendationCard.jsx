import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/themeContext';
import { useNavigation } from '@react-navigation/native';

const RecommendationCard = ({ item }) => {
    const { theme } = useTheme();
    const styles = getStyles(theme);
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Details', { product: item });
    };

    const imageSource = item.images && item.images.length > 0 ? item.images[0] : null;

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.8}>
            <Image source={imageSource} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.price}>₹{item.price}</Text>
            </View>
        </TouchableOpacity>
    );
};

const getStyles = (colors) => StyleSheet.create({
    container: {
        backgroundColor: colors.card,
        borderRadius: 10,
        width: 150,
        marginRight: 15,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
        backgroundColor: colors.background,
    },
    content: {
        padding: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.primary,
        marginTop: 5,
    },
});

export default RecommendationCard;
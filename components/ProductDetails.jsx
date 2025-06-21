import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    FlatList,
} from 'react-native';
import { useTheme } from '../contexts/themeContext';
import { useWishlist, WISHLIST_ACTIONS } from '../contexts/wishlistContext';
import { useCart, CART_ACTIONS } from '../contexts/cartContext';
import { Feather } from '@expo/vector-icons';
import { getProductList } from '../services/productService';
import RecommendationCard from './RecommendationCard';

const { width } = Dimensions.get('window');

const ProductDetails = ({ route, navigation }) => {
    const { theme } = useTheme();
    const { wishlist, dispatch: wishlistDispatch } = useWishlist();
    const { dispatch: cartDispatch } = useCart();
    const styles = getStyles(theme);

    if (!route.params || !route.params.product) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Product not found.</Text>
            </View>
        );
    }

    const { product } = route.params;

    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('description');

    const isWishlisted = wishlist.some(item => item.id === product.id);

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (!product.category) return;
            const { products: allProducts } = await getProductList();
            const relatedProducts = allProducts
                .filter(p => p.category === product.category && p.id !== product.id)
                .slice(0, 5);
            setRecommendedProducts(relatedProducts);
        };
        fetchRecommendations();
    }, [product.id, product.category]);

    const handleToggleWishlist = () => {
        wishlistDispatch({ type: WISHLIST_ACTIONS.TOGGLE_WISHLIST_ITEM, payload: product });
    };
    
    const handleAddToCart = () => {
        cartDispatch({ type: CART_ACTIONS.ADD_TO_CART, payload: product });
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={handleToggleWishlist} style={{ marginRight: 10 }}>
                    <Feather
                        name="heart"
                        size={24}
                        color={isWishlisted ? '#e74c3c' : theme.subtleText}
                        fill={isWishlisted ? '#e74c3c' : 'none'}
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation, isWishlisted, theme]);
    
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Feather key={i} name="star" size={16} color={i < rating ? '#ffc107' : theme.border} style={{ marginRight: 2 }} fill={i < rating ? '#ffc107' : 'none'}/>
        ));
    };

    const renderImageCarousel = () => (
        <View style={styles.imageContainer}>
            <FlatList
                data={product.images}
                renderItem={({ item }) => (
                    <Image source={typeof item === 'string' ? { uri: item } : item} style={styles.productImage} />
                )}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    const index = Math.round(event.nativeEvent.contentOffset.x / width);
                    setCurrentImageIndex(index);
                }}
            />
            <View style={styles.imageIndicators}>
                {product.images && product.images.length > 1 && product.images.map((_, index) => (
                    <View
                        key={index}
                        style={[ styles.indicator, currentImageIndex === index && styles.activeIndicator ]}
                    />
                ))}
            </View>
        </View>
    );

    const renderTabContent = () => {
        if (activeTab === 'description') {
            return <Text style={styles.description}>{product.description}</Text>;
        }
        if (activeTab === 'specifications' && product.specifications) {
            return Object.entries(product.specifications).map(([key, value]) => (
                <View key={key} style={styles.specRow}>
                    <Text style={styles.specKey}>{key}</Text>
                    <Text style={styles.specValue}>{value}</Text>
                </View>
            ));
        }
        if (activeTab === 'reviews' && product.reviews) {
            return product.reviews.map(review => (
                <View key={review.id} style={styles.reviewItem}>
                    <View style={styles.reviewHeader}>
                        <Text style={styles.reviewUser}>{review.user}</Text>
                        <View style={{flexDirection: 'row'}}>{renderStars(review.rating)}</View>
                    </View>
                    <Text style={styles.reviewComment}>{review.comment}</Text>
                </View>
            ));
        }
        return <Text style={styles.description}>No information available for this section.</Text>;
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderImageCarousel()}
                <View style={styles.detailsContainer}>
                    <View style={styles.productInfoContainer}>
                        <Text style={styles.category}>{product.category?.toUpperCase()}</Text>
                        <Text style={styles.title}>{product.title}</Text>
                        <Text style={styles.price}>₹{product.price}</Text>
                    </View>

                    <View style={styles.tabsContainer}>
                        <TouchableOpacity onPress={() => setActiveTab('description')} style={[styles.tab, activeTab === 'description' && styles.activeTab]}>
                            <Text style={[styles.tabText, activeTab === 'description' && styles.activeTabText]}>Description</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setActiveTab('specifications')} style={[styles.tab, activeTab === 'specifications' && styles.activeTab]}>
                            <Text style={[styles.tabText, activeTab === 'specifications' && styles.activeTabText]}>Details</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setActiveTab('reviews')} style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}>
                            <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>Reviews</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tabContent}>{renderTabContent()}</View>
                </View>
                
                {recommendedProducts.length > 0 && (
                    <View style={styles.recommendationSection}>
                        <Text style={styles.recommendationTitle}>You Might Also Like</Text>
                        <FlatList
                            data={recommendedProducts}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => <RecommendationCard item={item} />}
                            contentContainerStyle={{ paddingLeft: 20, paddingRight: 5 }}
                        />
                    </View>
                )}
            </ScrollView>
            <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const getStyles = (colors) => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
    errorText: { fontSize: 18, color: colors.text },
    imageContainer: { height: 350, backgroundColor: colors.card },
    productImage: { width: width, height: '100%', resizeMode: 'cover' },
    imageIndicators: { flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: 15, alignSelf: 'center' },
    indicator: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255, 255, 255, 0.5)', marginHorizontal: 4 },
    activeIndicator: { backgroundColor: colors.primary },
    detailsContainer: {
        backgroundColor: colors.card,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        paddingBottom: 10,
    },
    productInfoContainer: { 
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    category: { fontSize: 12, fontWeight: 'bold', color: colors.subtleText, textTransform: 'uppercase', marginBottom: 8 },
    title: { fontSize: 26, fontWeight: 'bold', color: colors.text, marginBottom: 10 },
    price: { fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: 10 },
    tabsContainer: { flexDirection: 'row', backgroundColor: colors.card, paddingHorizontal: 20 },
    tab: { paddingVertical: 15, marginRight: 25 },
    activeTab: { borderBottomWidth: 3, borderBottomColor: colors.primary },
    tabText: { fontSize: 16, color: colors.subtleText, fontWeight: '600' },
    activeTabText: { color: colors.text },
    tabContent: { paddingHorizontal: 20, paddingTop: 20, backgroundColor: colors.card, minHeight: 150 },
    description: { fontSize: 16, color: colors.subtleText, lineHeight: 24 },
    specRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
    specKey: { fontSize: 15, color: colors.subtleText, fontWeight: '500' },
    specValue: { fontSize: 15, color: colors.text, fontWeight: '600', flex: 1, textAlign: 'right' },
    reviewItem: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: colors.border },
    reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
    reviewUser: { fontSize: 16, fontWeight: 'bold', color: colors.text },
    reviewComment: { fontSize: 15, color: colors.subtleText, lineHeight: 22, marginTop: 5 },
    actionButtons: { padding: 15, backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: colors.border },
    addToCartButton: { backgroundColor: colors.primary, padding: 15, borderRadius: 12, alignItems: 'center' },
    buttonText: { color: colors.theme === 'dark' ? colors.background : '#fff', fontSize: 18, fontWeight: 'bold' },
    recommendationSection: { paddingTop: 20, paddingBottom: 20, backgroundColor: colors.background },
    recommendationTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginLeft: 20, marginBottom: 15 },
});

export default ProductDetails;
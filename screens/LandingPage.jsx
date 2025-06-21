import React, { useEffect, useState, useMemo } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    TextInput,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import ProductList from '../components/ProductList';
import { getProductList } from '../services/productService';
import { useTheme } from '../contexts/themeContext';

const LandingPage = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const categories = useMemo(() => {
    if (allProducts.length === 0) return [];
    const uniqueCategories = [...new Set(allProducts.map(p => p.category))];
    return ['All', ...uniqueCategories];
  }, [allProducts]);

  useEffect(() => {
    const _fetchProductData = async () => {
      setIsLoading(true);
      try {
        const { products } = await getProductList();
        setAllProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    _fetchProductData();
  }, []);

  useEffect(() => {
    let products = [...allProducts];

    if (selectedCategory !== 'All') {
      products = products.filter(product => product.category === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      products = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(products);
  }, [searchQuery, selectedCategory, allProducts]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color={theme.subtleText} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for products..."
            placeholderTextColor={theme.subtleText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View>
        <FlatList
            data={categories}
            keyExtractor={(item) => item}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContainer}
            renderItem={({item}) => (
                <TouchableOpacity 
                    style={[styles.filterChip, selectedCategory === item && styles.activeFilterChip]}
                    onPress={() => setSelectedCategory(item)}
                >
                    <Text style={[styles.filterText, selectedCategory === item && styles.activeFilterText]}>{item}</Text>
                </TouchableOpacity>
            )}
        />
      </View>
      
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : (
        <ProductList data={filteredProducts} />
      )}
    </SafeAreaView>
  );
};

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: colors.text,
  },
  filterContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: colors.card,
  },
  filterChip: {
    backgroundColor: colors.background,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeFilterChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    color: colors.subtleText,
    fontWeight: '600',
    fontSize: 14,
  },
  activeFilterText: {
    color: colors.theme === 'dark' ? colors.background : '#fff',
  },
});

export default LandingPage;